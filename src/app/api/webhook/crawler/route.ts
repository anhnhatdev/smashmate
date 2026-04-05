import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';

const apiKey = process.env.GEMINI_API_KEY ?? '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    // Implement a simple secret check for the webhook
    if (authHeader !== `Bearer ${process.env.WEBHOOK_SECRET || 'smashmate-crawler-secret'}`) {
      return NextResponse.json({ error: 'Unauthorized webhook access' }, { status: 401 });
    }

    if (!apiKey) {
      return NextResponse.json({ error: 'GEMINI_API_KEY not configured' }, { status: 500 });
    }

    const { platform, text, authorName, authorUrl, originalUrl } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Missing text content' }, { status: 400 });
    }

    // 1. Ensure Bot User exists
    let botUser = await prisma.user.findUnique({ where: { email: 'crawler@smashmate.test' } });
    if (!botUser) {
      botUser = await prisma.user.create({
        data: {
          name: 'SmashMate Bot',
          email: 'crawler@smashmate.test',
          role: 'ADMIN',
          image: 'https://cdn-icons-png.flaticon.com/512/4712/4712010.png'
        }
      });
    }

    // 2. Use Gemini to parse unstructured text
    const SYSTEM_PROMPT = `Bạn là chuyên gia phân tích dữ liệu bài đăng tìm kèo cầu lông từ Facebook.
Nhiệm vụ của bạn là đọc đoạn văn bản thô người ta đăng tìm kèo, và trích xuất ra một JSON object chính xác theo cấu trúc sau. Kể cả nếu thiếu thông tin, hãy nội suy hoặc dùng giá trị mặc định hợp lý.

YÊU CẦU JSON SCHEMA BẮT BUỘC TRẢ VỀ (Không markdown, chỉ text JSON hợp lệ):
{
  "courtName": "Tên sân cầu lông (ví dụ: Sân tập Cao Lỗ, Viettel, Đào Duy Anh... rỗng nếu không rõ)",
  "startTime": "HH:mm (ví dụ 18:00)",
  "endTime": "HH:mm (ví dụ 20:00)",
  "maleSlots": number (số slot nam cần tuyển, mặc định 0 nếu không nêu),
  "femaleSlots": number (số slot nữ cần tuyển, mặc định 0),
  "maleFee": number (phí cho nam, đơn vị ngàn đồng, vd 50k -> 50),
  "femaleFee": number (phí cho nữ, đơn vị ngàn đồng, vd 40k -> 40),
  "maleLevels": ["Y", "TB", "Khá"] (mảng các level yêu cầu),
  "femaleLevels": ["Y+", "TB-"] (mảng các level yêu cầu),
  "notes": "Trích xuất ghi chú, quy định hoặc SĐT liên lạc nếu có"
}
Lưu ý: level có thể thuộc các giá trị: Y, Y+, TBY, TBY+, TB-, TB, TB+, TB++, TBK, Khá.

TEXT CẦN PHÂN TÍCH:
"${text}"
`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });
    const result = await model.generateContent(SYSTEM_PROMPT);
    const resultText = result.response.text();
    
    // Attempt to parse JSON
    let parsedData;
    try {
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
         parsedData = JSON.parse(jsonMatch[0]);
      } else {
         parsedData = JSON.parse(resultText);
      }
    } catch (parseError) {
      console.error('[crawler/route] JSON Parse Error:', resultText);
      return NextResponse.json({ error: 'AI không trả về định dạng JSON hợp lệ.', raw: resultText }, { status: 500 });
    }

    // 3. Match Court against Database (Optional Enhancement)
    let courtId = null;
    if (parsedData.courtName) {
      // Find exact or contains match
      const courtInfo = await prisma.court.findFirst({
         where: { name: { contains: parsedData.courtName.replace('sân', '').trim(), mode: 'insensitive' } }
      });
      if (courtInfo) courtId = courtInfo.id;
    }

    // 4. Save to Database
    const post = await prisma.post.create({
      data: {
        postType: 'tuyen-keo',
        authorId: botUser.id,
        courtName: parsedData.courtName || 'Chưa rõ',
        courtId: courtId,
        eventDate: new Date(), // Today assumption for crawler
        startTime: parsedData.startTime || '18:00',
        endTime: parsedData.endTime || '20:00',
        targetGender: (parsedData.maleSlots > 0 && parsedData.femaleSlots === 0) ? 'male' : (parsedData.femaleSlots > 0 && parsedData.maleSlots === 0) ? 'female' : 'all',
        maleSlots: parsedData.maleSlots || 0,
        femaleSlots: parsedData.femaleSlots || 0,
        maleFee: parsedData.maleFee || 0,
        femaleFee: parsedData.femaleFee || 0,
        maleLevels: parsedData.maleLevels || [],
        femaleLevels: parsedData.femaleLevels || [],
        notes: `[Nguồn: ${platform} - ${authorName}] ${parsedData.notes || ''}`,
        contactFb: authorUrl || originalUrl || '',
      }
    });

    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch (error: any) {
    console.error('[crawler/route] Error Handler:', error);
    return NextResponse.json({ error: error.message || 'Lỗi hệ thống Webhook.' }, { status: 500 });
  }
}

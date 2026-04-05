import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import prisma from '@/lib/prisma';

const apiKey = process.env.GEMINI_API_KEY ?? '';
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'GEMINI_API_KEY chưa được cấu hình trong .env' },
        { status: 500 },
      );
    }

    const { currentMessage } = await req.json();

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' });

    // Step 1: Tell AI to extract search parameters in JSON
    const SYSTEM_PROMPT = `
Bạn là AI của mạng xã hội SmashMate chuyên về cầu lông.
Nhiệm vụ của bạn là đọc yêu cầu của user và trích xuất tham số tìm kiếm thành độ phân giải JSON.

YÊU CẦU ĐỊNH DẠNG TRẢ VỀ (CHỈ CODE TRẢ VỀ JSON HỢP LỆ, KHÔNG BÌNH LUẬN):
{
  "isSearchIntent": boolean (true nếu người dùng đang muốn tìm sân, tìm kèo, học đánh. false nếu hỏi linh tinh),
  "chatReply": "Câu trả lời thân thiện (Ví dụ: Mình tìm thấy vài kèo cho bạn nè, hoặc trả lời tự do nếu không phải tìm kèo)",
  "courtName": "Tên sân hoặc quận/huyện (vd: Gò Vấp, Viettel)",
  "level": "Trình độ yêu cầu (vd: Y, TB, Khá, Y+)",
  "slots": "Số lượng người (số nguyên)"
}

LỜI NHẮN TỪ USER: "${currentMessage}"`;

    const result = await model.generateContent(SYSTEM_PROMPT);
    const resultText = result.response.text();
    
    let parsed: any = null;
    try {
      const match = resultText.match(/\{[\s\S]*\}/);
      if (match) parsed = JSON.parse(match[0]);
      else parsed = JSON.parse(resultText);
    } catch(e) {
      // Fallback
      return NextResponse.json({ success: true, reply: "Mình chưa hiểu rõ lắm, bạn nói lại xíu được không? 🏸" }, { status: 200 });
    }

    if (!parsed.isSearchIntent) {
      return NextResponse.json({ success: true, reply: parsed.chatReply }, { status: 200 });
    }

    // Step 2: Query database based on parsed intent
    const where: any = { status: 'OPEN' };
    
    if (parsed.courtName) {
      where.courtName = { contains: parsed.courtName, mode: 'insensitive' };
    }
    
    if (parsed.level) {
       where.OR = [
         { maleLevels: { has: parsed.level } },
         { femaleLevels: { has: parsed.level } }
       ];
    }
    
    // Quick limit to 3 best hits
    const posts = await prisma.post.findMany({
       where,
       take: 3,
       orderBy: { createdAt: 'desc' },
       include: { author: true }
    });

    let msg = parsed.chatReply;
    if (posts.length === 0) {
      msg = "Mình đã rà soát nhưng tạm thời chưa có kèo nào trống khớp nguyện vọng của bạn á 🥺 Bạn thử mở rộng khu vực xem sao!";
    }

    return NextResponse.json({ 
      success: true, 
      reply: msg, 
      posts: posts.map(p => ({
         id: p.id,
         courtName: p.courtName,
         startTime: p.startTime,
         endTime: p.endTime,
         postType: p.postType,
         maleFee: p.maleFee,
         femaleFee: p.femaleFee
      })) 
    }, { status: 200 });
  } catch (error: any) {
    console.error('[chat/route] Gemini error:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi kết nối với AI.' },
      { status: 500 },
    );
  }
}

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

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

    const SYSTEM_PROMPT = `Bạn là SmashMate AI - trợ lý ảo trên nền tảng tìm kèo cầu lông SmashMate.
Trả lời ngắn gọn, thân thiện, xưng hô “Mình / Bạn”.
Nếu người dùng hỏi tìm kèo / lớp dạy / mua bán, hãy nói “Đã tìm thấy thông tin” và gợi ý chung.
Chỉ phản hồi bằng text thuần (hạn chế markdown) kèm emoji liên quan.

Tin nhắn của người dùng: "${currentMessage}"`;

    const result = await model.generateContent(SYSTEM_PROMPT);
    const reply = result.response.text();

    return NextResponse.json({ success: true, reply }, { status: 200 });
  } catch (error: any) {
    console.error('[chat/route] Gemini error:', error);
    return NextResponse.json(
      { error: 'Đã có lỗi xảy ra khi kết nối với AI.' },
      { status: 500 },
    );
  }
}

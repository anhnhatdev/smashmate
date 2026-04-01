import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Trả về đối tượng Date cho ngày hôm nay + offsetDays, giờ 00:00:00 UTC */
function dateOffset(offsetDays: number): Date {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setDate(d.getDate() + offsetDays);
  return d;
}

function avatar(name: string): string {
  const encoded = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encoded}&background=random&size=128`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("🧹  Đang xóa dữ liệu cũ...");

  // Xóa User → CASCADE sẽ xóa toàn bộ Post liên quan
  await prisma.user.deleteMany();

  console.log("✅  Đã xóa dữ liệu cũ.\n");

  // ── 1. Tạo Users ──────────────────────────────────────────────────────────

  console.log("👤  Đang tạo Users...");

  const [hoangLong, thuHuong, minhTuan] = await Promise.all([
    prisma.user.create({
      data: {
        name: "Hoàng Long",
        email: "hoanglong@smashmate.vn",
        image: avatar("Hoang Long"),
        phone: "0901234567",
        fbLink: "https://facebook.com/hoanglong.badminton",
        level: "TB+",
        address: "Cầu Giấy, Hà Nội",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Thu Hương",
        email: "thuhuong@smashmate.vn",
        image: avatar("Thu Huong"),
        phone: "0912345678",
        fbLink: "https://facebook.com/thuhuong.cau",
        level: "TBY+",
        address: "Đống Đa, Hà Nội",
        role: "USER",
      },
    }),
    prisma.user.create({
      data: {
        name: "Minh Tuấn",
        email: "minhtuan@smashmate.vn",
        image: avatar("Minh Tuan"),
        phone: "0923456789",
        fbLink: "https://facebook.com/minhtuan.smash",
        level: "Khá",
        address: "Hoàn Kiếm, Hà Nội",
        role: "USER",
      },
    }),
  ]);

  console.log(
    `✅  Đã tạo 3 users: ${hoangLong.name}, ${thuHuong.name}, ${minhTuan.name}\n`
  );

  // ── 2. Tạo Posts ──────────────────────────────────────────────────────────

  console.log("📋  Đang tạo Posts...");

  const posts = await prisma.post.createMany({
    data: [
      // ── TUYEN-KEO (10 bài) ───────────────────────────────────────────────

      // 1. Hoàng Long - hôm nay tối
      {
        postType: "tuyen-keo",
        courtName: "Sân Cầu Giấy",
        eventDate: dateOffset(0),
        startTime: "20:00",
        endTime: "22:00",
        targetGender: "male",
        maleSlots: 2,
        maleFee: 50000,
        maleLevels: ["TB", "TB+"],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: hoangLong.phone ?? "",
        contactFb: hoangLong.fbLink ?? "",
        notes: "Chơi đôi nam, cần thêm 2 anh em TB trở lên. Sân có đèn tốt.",
        status: "OPEN",
        authorId: hoangLong.id,
      },

      // 2. Hoàng Long - ngày mai sáng sớm
      {
        postType: "tuyen-keo",
        courtName: "Sân Đào Duy Anh",
        eventDate: dateOffset(1),
        startTime: "06:00",
        endTime: "08:00",
        targetGender: "all",
        maleSlots: 1,
        maleFee: 45000,
        maleLevels: ["Y+", "TBY"],
        femaleSlots: 1,
        femaleFee: 40000,
        femaleLevels: ["Y", "Y+"],
        contactPhone: hoangLong.phone ?? "",
        contactFb: hoangLong.fbLink ?? "",
        notes: "Buổi sáng thoáng mát, phù hợp người mới tập.",
        status: "OPEN",
        authorId: hoangLong.id,
      },

      // 3. Hoàng Long - ngày kia chiều tối
      {
        postType: "tuyen-keo",
        courtName: "Sân Rian",
        eventDate: dateOffset(2),
        startTime: "18:00",
        endTime: "20:00",
        targetGender: "all",
        maleSlots: 3,
        maleFee: 60000,
        maleLevels: ["TB+", "TB++", "TBK"],
        femaleSlots: 2,
        femaleFee: 55000,
        femaleLevels: ["TBY+", "TB-", "TB"],
        contactPhone: hoangLong.phone ?? "",
        contactFb: hoangLong.fbLink ?? "",
        notes:
          "Cần người chơi nghiêm túc, đúng giờ. Ưu tiên người có kinh nghiệm.",
        status: "OPEN",
        authorId: hoangLong.id,
      },

      // 4. Hoàng Long - cuối tuần
      {
        postType: "tuyen-keo",
        courtName: "Sân Làng Lụa",
        eventDate: dateOffset(5),
        startTime: "20:00",
        endTime: "22:00",
        targetGender: "male",
        maleSlots: 5,
        maleFee: 70000,
        maleLevels: ["Khá", "TBK"],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: hoangLong.phone ?? "",
        notes: "Cần đủ quân đánh đôi nam. Hội tụ cao thủ cuối tuần!",
        status: "OPEN",
        authorId: hoangLong.id,
      },

      // 5. Thu Hương - hôm nay tối
      {
        postType: "tuyen-keo",
        courtName: "Sân Đống Đa",
        eventDate: dateOffset(0),
        startTime: "18:00",
        endTime: "20:00",
        targetGender: "female",
        maleSlots: 0,
        maleFee: 0,
        maleLevels: [],
        femaleSlots: 2,
        femaleFee: 45000,
        femaleLevels: ["Y", "Y+", "TBY"],
        contactPhone: thuHuong.phone ?? "",
        contactFb: thuHuong.fbLink ?? "",
        notes: "Hội nữ thân thiện, vui vẻ. Gà mờ cứ tự tin ib nhé!",
        status: "OPEN",
        authorId: thuHuong.id,
      },

      // 6. Thu Hương - ngày mai
      {
        postType: "tuyen-keo",
        courtName: "Sân Cầu Giấy",
        eventDate: dateOffset(1),
        startTime: "20:00",
        endTime: "22:00",
        targetGender: "all",
        maleSlots: 1,
        maleFee: 55000,
        maleLevels: ["TB-", "TB"],
        femaleSlots: 2,
        femaleFee: 50000,
        femaleLevels: ["TBY+", "TB-"],
        contactPhone: thuHuong.phone ?? "",
        contactFb: thuHuong.fbLink ?? "",
        notes: "Nhóm hỗn hợp vui, không cạnh tranh quá căng.",
        status: "OPEN",
        authorId: thuHuong.id,
      },

      // 7. Thu Hương - ngày kia
      {
        postType: "tuyen-keo",
        courtName: "Sân Rian",
        eventDate: dateOffset(3),
        startTime: "06:00",
        endTime: "08:00",
        targetGender: "all",
        maleSlots: 4,
        maleFee: 50000,
        maleLevels: ["TBY", "TBY+", "TB-", "TB"],
        femaleSlots: 3,
        femaleFee: 45000,
        femaleLevels: ["Y+", "TBY", "TBY+"],
        contactPhone: thuHuong.phone ?? "",
        notes: "Buổi sáng tập thể dục. Ai dậy sớm được thì join!",
        status: "OPEN",
        authorId: thuHuong.id,
      },

      // 8. Minh Tuấn - hôm nay tối
      {
        postType: "tuyen-keo",
        courtName: "Sân Đào Duy Anh",
        eventDate: dateOffset(0),
        startTime: "20:00",
        endTime: "22:00",
        targetGender: "male",
        maleSlots: 1,
        maleFee: 65000,
        maleLevels: ["TB++", "TBK", "Khá"],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: minhTuan.phone ?? "",
        contactFb: minhTuan.fbLink ?? "",
        notes: "Cần 1 anh đánh đôi trình Khá/TBK. Đánh nghiêm túc.",
        status: "OPEN",
        authorId: minhTuan.id,
      },

      // 9. Minh Tuấn - ngày mai tối
      {
        postType: "tuyen-keo",
        courtName: "Sân Làng Lụa",
        eventDate: dateOffset(1),
        startTime: "18:00",
        endTime: "20:00",
        targetGender: "all",
        maleSlots: 2,
        maleFee: 60000,
        maleLevels: ["TB+", "TB++"],
        femaleSlots: 1,
        femaleFee: 55000,
        femaleLevels: ["TB", "TB+"],
        contactPhone: minhTuan.phone ?? "",
        contactFb: minhTuan.fbLink ?? "",
        notes: "Sân mới, thoáng. Đánh vui là chính nhưng trình phải ổn.",
        status: "OPEN",
        authorId: minhTuan.id,
      },

      // 10. Minh Tuấn - cuối tuần
      {
        postType: "tuyen-keo",
        courtName: "Sân Cầu Giấy",
        eventDate: dateOffset(6),
        startTime: "20:00",
        endTime: "22:00",
        targetGender: "all",
        maleSlots: 3,
        maleFee: 70000,
        maleLevels: ["TBK", "Khá"],
        femaleSlots: 2,
        femaleFee: 65000,
        femaleLevels: ["TB++", "TBK"],
        contactPhone: minhTuan.phone ?? "",
        contactFb: minhTuan.fbLink ?? "",
        notes: "Đánh cuối tuần thoải mái. Trình Khá/TBK. Đủ quân mới đánh.",
        status: "OPEN",
        authorId: minhTuan.id,
      },

      // ── PASS-SAN (2 bài) ─────────────────────────────────────────────────

      // 11. Hoàng Long - pass sân hôm nay
      {
        postType: "pass-san",
        courtName: "Sân Rian",
        eventDate: dateOffset(0),
        startTime: "18:00",
        endTime: "20:00",
        targetGender: "all",
        maleSlots: 0,
        maleFee: 0,
        maleLevels: [],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: hoangLong.phone ?? "",
        contactFb: hoangLong.fbLink ?? "",
        notes:
          "Mình bận đột xuất, pass lại sân 2 tiếng tối nay. Giá thương lượng. Nhắn tin nhanh!",
        status: "OPEN",
        authorId: hoangLong.id,
      },

      // 12. Thu Hương - pass sân ngày mai
      {
        postType: "pass-san",
        courtName: "Sân Đống Đa",
        eventDate: dateOffset(1),
        startTime: "06:00",
        endTime: "08:00",
        targetGender: "all",
        maleSlots: 0,
        maleFee: 0,
        maleLevels: [],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: thuHuong.phone ?? "",
        notes: "Pass sân sáng mai, không dùng được. Ai cần thì liên hệ gấp!",
        status: "OPEN",
        authorId: thuHuong.id,
      },

      // ── LOP-DAY (1 bài) ──────────────────────────────────────────────────

      // 13. Minh Tuấn - lớp dạy
      {
        postType: "lop-day",
        courtName: "Sân Đào Duy Anh",
        eventDate: dateOffset(3),
        startTime: "08:00",
        endTime: "10:00",
        targetGender: "all",
        maleSlots: 4,
        maleFee: 150000,
        maleLevels: ["Y", "Y+", "TBY"],
        femaleSlots: 4,
        femaleFee: 150000,
        femaleLevels: ["Y", "Y+", "TBY"],
        contactPhone: minhTuan.phone ?? "",
        contactFb: minhTuan.fbLink ?? "",
        notes:
          "Lớp học cầu lông cơ bản dành cho người mới. HLV kinh nghiệm 10 năm. Đăng ký sớm còn chỗ.",
        status: "OPEN",
        authorId: minhTuan.id,
      },

      // ── MUA-BAN (2 bài) ──────────────────────────────────────────────────

      // 14. Hoàng Long - bán vợt
      {
        postType: "mua-ban",
        courtName: null,
        eventDate: dateOffset(0),
        startTime: "08:00",
        endTime: "22:00",
        targetGender: "all",
        maleSlots: 0,
        maleFee: 0,
        maleLevels: [],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: hoangLong.phone ?? "",
        contactFb: hoangLong.fbLink ?? "",
        notes:
          "Bán vợt Yonex Astrox 88S Play, đánh được 3 tháng, còn mới 90%. Giá 800k. Có thể ship hoặc gặp mặt.",
        status: "OPEN",
        authorId: hoangLong.id,
      },

      // 15. Thu Hương - mua cầu
      {
        postType: "mua-ban",
        courtName: null,
        eventDate: dateOffset(0),
        startTime: "08:00",
        endTime: "22:00",
        targetGender: "all",
        maleSlots: 0,
        maleFee: 0,
        maleLevels: [],
        femaleSlots: 0,
        femaleFee: 0,
        femaleLevels: [],
        contactPhone: thuHuong.phone ?? "",
        contactFb: thuHuong.fbLink ?? "",
        notes:
          "Cần mua cầu lông lông vũ loại tốt, khoảng 150-200k/hộp. Ai có nguồn uy tín thì pm mình nhé!",
        status: "OPEN",
        authorId: thuHuong.id,
      },
    ],
  });

  console.log(`✅  Đã tạo ${posts.count} posts thành công!\n`);
  console.log("🎉  Seed hoàn tất! Database đã sẵn sàng để test Filter.\n");

  // ── Summary ───────────────────────────────────────────────────────────────
  const summary = await prisma.post.groupBy({
    by: ["postType"],
    _count: { id: true },
  });

  console.log("📊  Tổng kết theo loại bài đăng:");
  summary.forEach((s) => {
    console.log(`   ${s.postType.padEnd(12)} → ${s._count.id} bài`);
  });
}

main()
  .catch((e) => {
    console.error("❌  Seed thất bại:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

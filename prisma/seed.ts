import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns a Date for today + offsetDays at 00:00:00 UTC */
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
  console.log("🧹  Clearing old data...");
  await prisma.user.deleteMany();
  console.log("✅  Done.\n");

  // ── 1. Users ──
  console.log("👤  Creating users...");
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
  console.log(`✅  Created: ${hoangLong.name}, ${thuHuong.name}, ${minhTuan.name}\n`);

  // ── 2. Posts ──
  console.log("📋  Creating posts...");
  const posts = await prisma.post.createMany({
    data: [
      // tuyen-keo posts
      { postType: "tuyen-keo", courtName: "Sân Cầu Giấy", eventDate: dateOffset(0), startTime: "20:00", endTime: "22:00", targetGender: "male", maleSlots: 2, maleFee: 50000, maleLevels: ["TB", "TB+"], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: hoangLong.phone ?? "", contactFb: hoangLong.fbLink ?? "", notes: "Chơi đôi nam, cần thêm 2 anh em TB trở lên. Sân có đèn tốt.", status: "OPEN", authorId: hoangLong.id },
      { postType: "tuyen-keo", courtName: "Sân Đào Duy Anh", eventDate: dateOffset(1), startTime: "06:00", endTime: "08:00", targetGender: "all", maleSlots: 1, maleFee: 45000, maleLevels: ["Y+", "TBY"], femaleSlots: 1, femaleFee: 40000, femaleLevels: ["Y", "Y+"], contactPhone: hoangLong.phone ?? "", contactFb: hoangLong.fbLink ?? "", notes: "Buổi sáng thoáng mát, phù hợp người mới tập.", status: "OPEN", authorId: hoangLong.id },
      { postType: "tuyen-keo", courtName: "Sân Rian", eventDate: dateOffset(2), startTime: "18:00", endTime: "20:00", targetGender: "all", maleSlots: 3, maleFee: 60000, maleLevels: ["TB+", "TB++", "TBK"], femaleSlots: 2, femaleFee: 55000, femaleLevels: ["TBY+", "TB-", "TB"], contactPhone: hoangLong.phone ?? "", contactFb: hoangLong.fbLink ?? "", notes: "Cần người chơi nghiêm túc, đúng giờ.", status: "OPEN", authorId: hoangLong.id },
      { postType: "tuyen-keo", courtName: "Sân Làng Lụa", eventDate: dateOffset(5), startTime: "20:00", endTime: "22:00", targetGender: "male", maleSlots: 5, maleFee: 70000, maleLevels: ["Khá", "TBK"], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: hoangLong.phone ?? "", notes: "Cuối tuần cao thủ hội tụ!", status: "OPEN", authorId: hoangLong.id },
      { postType: "tuyen-keo", courtName: "Sân Đống Đa", eventDate: dateOffset(0), startTime: "18:00", endTime: "20:00", targetGender: "female", maleSlots: 0, maleFee: 0, maleLevels: [], femaleSlots: 2, femaleFee: 45000, femaleLevels: ["Y", "Y+", "TBY"], contactPhone: thuHuong.phone ?? "", contactFb: thuHuong.fbLink ?? "", notes: "Hội nữ thân thiện. Gà mờ cứ tự tin ib nhé!", status: "OPEN", authorId: thuHuong.id },
      { postType: "tuyen-keo", courtName: "Sân Cầu Giấy", eventDate: dateOffset(1), startTime: "20:00", endTime: "22:00", targetGender: "all", maleSlots: 1, maleFee: 55000, maleLevels: ["TB-", "TB"], femaleSlots: 2, femaleFee: 50000, femaleLevels: ["TBY+", "TB-"], contactPhone: thuHuong.phone ?? "", contactFb: thuHuong.fbLink ?? "", notes: "Nhóm hỗn hợp vui.", status: "OPEN", authorId: thuHuong.id },
      { postType: "tuyen-keo", courtName: "Sân Rian", eventDate: dateOffset(3), startTime: "06:00", endTime: "08:00", targetGender: "all", maleSlots: 4, maleFee: 50000, maleLevels: ["TBY", "TBY+", "TB-", "TB"], femaleSlots: 3, femaleFee: 45000, femaleLevels: ["Y+", "TBY", "TBY+"], contactPhone: thuHuong.phone ?? "", notes: "Buổi sáng tập thể dục!", status: "OPEN", authorId: thuHuong.id },
      { postType: "tuyen-keo", courtName: "Sân Đào Duy Anh", eventDate: dateOffset(0), startTime: "20:00", endTime: "22:00", targetGender: "male", maleSlots: 1, maleFee: 65000, maleLevels: ["TB++", "TBK", "Khá"], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: minhTuan.phone ?? "", contactFb: minhTuan.fbLink ?? "", notes: "Cần 1 anh đánh đôi trình Khá/TBK.", status: "OPEN", authorId: minhTuan.id },
      { postType: "tuyen-keo", courtName: "Sân Làng Lụa", eventDate: dateOffset(1), startTime: "18:00", endTime: "20:00", targetGender: "all", maleSlots: 2, maleFee: 60000, maleLevels: ["TB+", "TB++"], femaleSlots: 1, femaleFee: 55000, femaleLevels: ["TB", "TB+"], contactPhone: minhTuan.phone ?? "", contactFb: minhTuan.fbLink ?? "", notes: "Sân mới, thoáng. Đánh vui là chính.", status: "OPEN", authorId: minhTuan.id },
      { postType: "tuyen-keo", courtName: "Sân Cầu Giấy", eventDate: dateOffset(6), startTime: "20:00", endTime: "22:00", targetGender: "all", maleSlots: 3, maleFee: 70000, maleLevels: ["TBK", "Khá"], femaleSlots: 2, femaleFee: 65000, femaleLevels: ["TB++", "TBK"], contactPhone: minhTuan.phone ?? "", contactFb: minhTuan.fbLink ?? "", notes: "Đánh cuối tuần. Trình Khá/TBK.", status: "OPEN", authorId: minhTuan.id },
      // pass-san posts
      { postType: "pass-san", courtName: "Sân Rian", eventDate: dateOffset(0), startTime: "18:00", endTime: "20:00", targetGender: "all", maleSlots: 0, maleFee: 0, maleLevels: [], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: hoangLong.phone ?? "", contactFb: hoangLong.fbLink ?? "", notes: "Bận đột xuất, pass lại sân 2 tiếng. Giá thương lượng.", status: "OPEN", authorId: hoangLong.id },
      { postType: "pass-san", courtName: "Sân Đống Đa", eventDate: dateOffset(1), startTime: "06:00", endTime: "08:00", targetGender: "all", maleSlots: 0, maleFee: 0, maleLevels: [], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: thuHuong.phone ?? "", notes: "Pass sân sáng mai. Liên hệ gấp!", status: "OPEN", authorId: thuHuong.id },
      // lop-day post
      { postType: "lop-day", courtName: "Sân Đào Duy Anh", eventDate: dateOffset(3), startTime: "08:00", endTime: "10:00", targetGender: "all", maleSlots: 4, maleFee: 150000, maleLevels: ["Y", "Y+", "TBY"], femaleSlots: 4, femaleFee: 150000, femaleLevels: ["Y", "Y+", "TBY"], contactPhone: minhTuan.phone ?? "", contactFb: minhTuan.fbLink ?? "", notes: "Lớp học cầu lông cơ bản. HLV kinh nghiệm 10 năm.", status: "OPEN", authorId: minhTuan.id },
      // mua-ban posts
      { postType: "mua-ban", courtName: null, eventDate: dateOffset(0), startTime: "08:00", endTime: "22:00", targetGender: "all", maleSlots: 0, maleFee: 0, maleLevels: [], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: hoangLong.phone ?? "", contactFb: hoangLong.fbLink ?? "", notes: "Bán vợt Yonex Astrox 88S Play, 3 tháng, 90% mới. Giá 800k.", status: "OPEN", authorId: hoangLong.id },
      { postType: "mua-ban", courtName: null, eventDate: dateOffset(0), startTime: "08:00", endTime: "22:00", targetGender: "all", maleSlots: 0, maleFee: 0, maleLevels: [], femaleSlots: 0, femaleFee: 0, femaleLevels: [], contactPhone: thuHuong.phone ?? "", contactFb: thuHuong.fbLink ?? "", notes: "Cần mua cầu lông lông vũ loại tốt, 150-200k/hộp.", status: "OPEN", authorId: thuHuong.id },
    ],
  });
  console.log(`✅  Created ${posts.count} posts\n`);
  console.log("🎉  Seed complete!\n");
}

main()
  .catch((e) => {
    console.error("❌  Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

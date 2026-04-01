import { NextResponse } from 'next/server';

/**
 * GET /api/courts?q=rian
 *
 * Returns a list of courts with coordinates and active post counts.
 *
 * TODO: Replace MOCK_COURTS with a real Court model + PostGIS / Supabase
 * geospatial index when the Court table is added to the Prisma schema.
 *
 * Recommended schema (for reference):
 *   model Court {
 *     id          String   @id @default(cuid())
 *     name        String
 *     slug        String   @unique
 *     address     String
 *     district    String
 *     city        String
 *     lat         Float
 *     lng         Float
 *     activePosts Int      @default(0)
 *     createdAt   DateTime @default(now())
 *   }
 */

const MOCK_COURTS = [
  {
    id: 'court-1',
    name: 'Sân Rian Sport',
    address: '185B Nguyễn Oanh, Phường 10',
    district: 'Quận Gò Vấp',
    city: 'TP.HCM',
    lat: 10.8386,
    lng: 106.6713,
    activePosts: 5,
  },
  {
    id: 'court-2',
    name: 'Sân Phạm Tu Badminton',
    address: 'Bình Hưng',
    district: 'Huyện Bình Chánh',
    city: 'TP.HCM',
    lat: 10.7224,
    lng: 106.6663,
    activePosts: 2,
  },
  {
    id: 'court-3',
    name: 'THE B HOÀ BÌNH',
    address: 'Tân Phú',
    district: 'Quận Tân Phú',
    city: 'TP.HCM',
    lat: 10.7816,
    lng: 106.6343,
    activePosts: 12,
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q')?.toLowerCase();

  const data = q
    ? MOCK_COURTS.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q),
      )
    : MOCK_COURTS;

  return NextResponse.json({
    success: true,
    data,
    paging: { total: data.length, page: 1, limit: 20 },
  });
}

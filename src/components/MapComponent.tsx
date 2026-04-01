'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search } from 'lucide-react';

// Fix Leaflet default icon paths broken by Webpack
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/** Smoothly flies to a new center/zoom when props change */
function MapUpdater({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { animate: true, duration: 1.5 });
  }, [center, zoom, map]);
  return null;
}

interface Court {
  id: string;
  name: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  activePosts: number;
}

export default function DynamicMap({ courts }: { courts: Court[] }) {
  const defaultCenter: [number, number] = [10.762622, 106.660172]; // Ho Chi Minh City

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        className="w-full h-full outline-none"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {courts.map((court) => (
          <Marker key={court.id} position={[court.lat, court.lng]}>
            <Popup className="rounded-xl overflow-hidden shadow-sm">
              <div className="p-1 min-w-[200px]">
                <div className="font-bold text-blue-600 text-sm mb-1">{court.name}</div>
                <div className="text-xs text-slate-500 mb-2">
                  {court.address}, {court.district}
                </div>
                <button className="w-full bg-blue-50 text-blue-600 py-1.5 rounded-lg text-xs font-bold border border-blue-100 flex items-center justify-center gap-1">
                  <Search className="w-3 h-3" /> Xem {court.activePosts} bài đăng tại đây
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Area selector overlay */}
        <div className="absolute top-4 left-4 z-[400] bg-white rounded-2xl shadow-lg border border-slate-200 p-4 w-[280px]">
          <h3 className="text-sm font-bold text-blue-600 mb-1">Khu vực trên bản đồ</h3>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            Chọn một vùng ngay trên bản đồ để lọc sân theo khu vực bạn muốn.
          </p>
          <button className="w-full bg-[#0ea5e9] text-white py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-sky-600 transition">
            Chọn khu vực
          </button>
        </div>

        {/* Floating control buttons */}
        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 text-slate-600 border border-slate-100 hover:-translate-y-0.5 transition-transform"
            aria-label="Locate me"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
          </button>
          <button
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-slate-50 text-slate-600 border border-slate-100 hover:-translate-y-0.5 transition-transform"
            aria-label="Home"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </button>
        </div>
      </MapContainer>
    </div>
  );
}

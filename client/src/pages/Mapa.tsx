import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface UBS {
  id: number;
  name: string;
  address: string;
  phone: string;
  hours: string;
  region: string;
  services: string[];
  penicillin: boolean;
  rating: number;
  saturday: boolean;
  lat: number;
  lng: number;
}

const ubsData: UBS[] = [
  {
    id: 1,
    name: "UBS Dr. Luiz Montenegro",
    address: "Rua Pico das Águas, 527 - Nossa Sra. das Graças",
    phone: "(92) 98842-6507",
    hours: "07:00 - 19:00 (Seg-Sex)",
    region: "norte",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: true,
    rating: 4.5,
    saturday: true,
    lat: -3.112443,
    lng: -60.021830,
  },
  {
    id: 2,
    name: "USF Clínica da Família Carmen Nicolau",
    address: "Rua Santa Tereza Davila, s/n - Lago Azul",
    phone: "(92) 3581-4219",
    hours: "07:00 - 19:00 (Seg-Sex) - 08:00 - 18:00 (Sáb-Dom)",
    region: "norte",
    services: ["Teste rápido", "Acompanhamento"],
    penicillin: true,
    rating: 4.2,
    saturday: true,
    lat: -2.974909,
    lng: -60.008392,
  },
  {
    id: 3,
    name: "UBS L-32 Coroado",
    address: "Rua Vinícius de Morães - Coroado",
    phone: "(92) 98802-4431",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "leste",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: false,
    rating: 3.8,
    saturday: false,
    lat: -3.087749,
    lng: -59.978528,
  },
  {
    id: 4,
    name: "USF Leonor de Freitas",
    address: "Rua João Pimentel, 135 - Compensa",
    phone: "(92) 3673-1297",
    hours: "07:00 - 19:00 (Seg-Sex)",
    region: "oeste",
    services: ["Teste rápido", "Tratamento"],
    penicillin: true,
    rating: 4.0,
    saturday: false,
    lat: -3.097390,
    lng: -60.056752,
  },
  {
    id: 5,
    name: "USF S-07 (Unidade de Saúde da Família)",
    address: "Rua Xavier de Mendonça, 228 - Nossa Sra. Aparecida",
    phone: "(92) 98802-4633",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "centro",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: true,
    rating: 4.7,
    saturday: false,
    lat: -3.130013,
    lng: -60.030393,
  },
  {
    id: 6,
    name: "UBS Theomário Pinto (S-52)",
    address: "Rua Nazareth Mesquita - Parque 10 de Novembro",
    phone: "(92) 98842-6543",
    hours: "07:00 - 19:00 (Seg-Sex)",
    region: "sul",
    services: ["Teste rápido", "Tratamento"],
    penicillin: true,
    rating: 4.3,
    saturday: false,
    lat: -3.075072,
    lng: -60.016176,
  },
  {
    id: 7,
    name: "UBS Dr. José Rayol dos Santos",
    address: "Av. Constantino Nery, s/n - Flores",
    phone: "(92) 98842-6517",
    hours: "07:00 - 21:00 (Seg-Sex)",
    region: "centro",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: true,
    rating: 4.3,
    saturday: false,
    lat: -3.087539,
    lng: -60.026777,
  },
  {
    id: 8,
    name: "UBS Arthur Virgílio Filho",
    address: "Tv. 10,3015 - Amazonino Mendes",
    phone: "(92) 3644-9354",
    hours: "07:00 - 19:00 (Seg-Sex)",
    region: "norte",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: true,
    rating: 4.4,
    saturday: false,
    lat: -3.041666,
    lng: -59.956818,
  },
  {
    id: 9,
    name: "USF Rosa Pereira de Almeida (antiga UBS Morro da Liberdade)",
    address: "Rua São Benedito, s/n - Morro da Liberdade",
    phone: "(92) 3624-4771",
    hours: "07:00 - 21:00 (Seg-Sex) - 07:00 - 12:00 (Sáb)",
    region: "sul",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: true,
    rating: 4.1,
    saturday: true,
    lat: -3.135464,
    lng: -60.000196,
  },
  {
    id: 10,
    name: "USF Frank Rosemberg Calderon",
    address: "Rua Boa Esperança, 282 - Crespo",
    phone: "(92) 98842-6513",
    hours: "06:00 - 17:00 (Seg-Sex)",
    region: "oeste",
    services: ["Teste rápido", "Tratamento"],
    penicillin: true,
    rating: 4.0,
    saturday: false,
    lat: -3.128316,
    lng: -59.991728,
  },
];

// Componente auxiliar para mover o mapa
function MapController({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 15, { animate: true, duration: 1.5 });
    }
  }, [center]);
  return null;
}

// Calcula distância entre dois pontos em km
function calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}

function isAberta(ubs: UBS): boolean {
  const agora = new Date();
  const diaSemana = agora.getDay(); // 0=Dom, 1=Seg ... 6=Sáb
  const hora = agora.getHours();
  const minuto = agora.getMinutes();
  const horaAtual = hora + minuto / 60;

  // Domingo
  if (diaSemana === 0) {
    if (!ubs.hours.includes("Dom")) return false;
    const match = ubs.hours.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})\s*\(Sáb-Dom\)/);
    if (!match) return false;
    const inicio = parseInt(match[1]) + parseInt(match[2]) / 60;
    const fim = parseInt(match[3]) + parseInt(match[4]) / 60;
    return horaAtual >= inicio && horaAtual < fim;
  }

  // Sábado
  if (diaSemana === 6) {
    if (!ubs.saturday) return false;
    const sabMatch = ubs.hours.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})\s*\(Sáb/);
    if (!sabMatch) return false;
    const inicio = parseInt(sabMatch[1]) + parseInt(sabMatch[2]) / 60;
    const fim = parseInt(sabMatch[3]) + parseInt(sabMatch[4]) / 60;
    return horaAtual >= inicio && horaAtual < fim;
  }

  // Seg–Sex
  const match = ubs.hours.match(/(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})\s*\(Seg-Sex\)/);
  if (!match) return false;
  const inicio = parseInt(match[1]) + parseInt(match[2]) / 60;
  const fim = parseInt(match[3]) + parseInt(match[4]) / 60;
  return horaAtual >= inicio && horaAtual < fim;
}

export default function Mapa() {
  const [, navigate] = useLocation();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUbs, setSelectedUbs] = useState<UBS | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-3.1019, -60.0250]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
      () => console.log("Geolocalização não disponível")
    );
  }, []);

  const regions = [
    { value: "all", label: "Todas" },
    { value: "norte", label: "Zona Norte" },
    { value: "sul", label: "Zona Sul" },
    { value: "leste", label: "Zona Leste" },
    { value: "oeste", label: "Zona Oeste" },
    { value: "centro", label: "Centro" },
  ];

  let filtered = ubsData;
  if (selectedRegion !== "all") {
    filtered = filtered.filter((ubs) => ubs.region === selectedRegion);
  }
  if (searchTerm) {
    filtered = filtered.filter((ubs) =>
      ubs.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ubs.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="flex flex-col bg-background">
      {/* Header */}
      <header className="bg-[#1A315B] p-4 sm:p-6 shadow-lg relative">
  <div className="container max-w-4xl mx-auto">
    <div className="flex items-center">
      <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-80 transition absolute left-4 sm:left-6 min-w-[48px] min-h-[48px] flex items-center justify-center">
        ←
      </button>
      <div className="flex-1 text-center px-12">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Mapa das UBSs</h1>
        <p className="text-sm sm:text-xl text-white opacity-90">Encontre seu local de atendimento mais próximo</p>
      </div>
    </div>
  </div>
</header>

      <div className="w-full py-4 px-2 sm:px-4">
  {/* Layout empilhado no mobile, lado a lado no desktop */}
  <div className="flex flex-row px-0 sm:px-2 gap-2 sm:gap-6 pb-0 items-stretch">
    {/* Lista de UBSs */}
    <div className="w-1/2 flex flex-col" style={{ height: "calc(100vh - 120px)"}}>
      <div className="bg-[#1A315B] rounded-2xl p-4 mb-4">
        <p className="text-white font-medium mb-3 text-sm sm:text-base">Clique em uma UBS para ver mais detalhes!</p>
        <input
          type="text"
          placeholder="Buscar UBS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-full bg-white border-2 border-white focus:border-[#51CA74] focus:outline-none text-gray-700 text-sm sm:text-base"
        />
      </div>
      <div className="space-y-3 overflow-y-auto flex-1 pr-2">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-4 text-center shadow border border-gray-100">
              <p className="text-gray-400 text-sm">Nenhuma UBS encontrada com esses critérios.</p>
            </div>
          ) : (
            filtered.map((ubs) => (
              <div
                key={ubs.id}
                onClick={() => {
                  setSelectedUbs(ubs);
                  setMapCenter([ubs.lat + 0.0001, ubs.lng + 0.0001]);
                  setTimeout(() => setMapCenter([ubs.lat, ubs.lng]), 100);
                }}
                className={`bg-white rounded-2xl p-3 sm:p-6 shadow-lg border-4 hover:shadow-xl transition cursor-pointer flex flex-col justify-between ${
                  selectedUbs?.id === ubs.id ? "border-[#51CA74]" : "border-[#0059FF]"
                }`}
              >
                {/* Nome e distância */}
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-sm sm:text-xl font-bold text-[#0059FF] leading-tight">{ubs.name}</h3>
                  <span className="text-xs font-bold text-white bg-[#0059FF] px-2 py-1 rounded-full whitespace-nowrap">
                    {userLocation ? `${calcularDistancia(userLocation[0], userLocation[1], ubs.lat, ubs.lng).toFixed(1)} km` : "-- km"}
                  </span>
                </div>
                {/* Endereço e horário */}
                <p className="text-xs sm:text-base text-gray-700 mb-1">{ubs.address}</p>
                <p className="text-xs sm:text-base text-gray-700 mb-2">{ubs.hours}</p>
                {/* Serviços */}
                <div className="flex flex-wrap gap-1 sm:gap-2 mb-2">
                  {ubs.services.map((service, idx) => (
                    <span key={idx} className="border-2 border-[#0059FF] text-[#0059FF] text-xs sm:text-sm px-2 py-1 rounded-lg font-medium">
                      {service}
                    </span>
                  ))}
                </div>
                {/* Status aberto */}
                <div className="flex items-center gap-2">
  <span className={`w-2 h-2 rounded-full ${isAberta(ubs) ? "bg-[#51CA74]" : "bg-red-500"}`}></span>
  <span className={`text-xs font-medium ${isAberta(ubs) ? "text-[#51CA74]" : "text-red-500"}`}>
    {isAberta(ubs) ? "Aberto agora" : "Fechado"}
  </span>
</div>
              </div>
            ))
          )}
        </div>
        </div>

        {/* Mapa — lado direito */}
        <div className="w-1/2 rounded-2xl overflow-hidden shadow-lg border-2 border-[#1A315B]" style={{ minHeight: "300px", height: "calc(100vh - 120px)" }}>
          <MapContainer
            center={[-3.1019, -60.0250]}
            zoom={12}
            style={{ height: "100%", width: "100%" }}
          >
            <MapController center={mapCenter} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            {filtered.map((ubs) => (
              <Marker key={ubs.id} position={[ubs.lat, ubs.lng]}>
                <Popup>
                  <div className="p-2">
                    <p className="font-bold text-[#1A315B]">{ubs.name}</p>
                    <p className="text-sm">{ubs.address}</p>
                    <p className="text-sm">📞 {ubs.phone}</p>
                    <p className="text-sm">🕐 {ubs.hours}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        </div>
      </div>
      {/* Accessibility Bar */}
<div className="fixed bottom-6 right-6 flex gap-2 z-[9999]">
  <button
    onClick={() => {
      const root = document.documentElement;
      const current = parseInt(root.style.fontSize || '16');
      root.style.fontSize = Math.min(24, current + 2) + 'px';
    }}
    className="w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform font-bold"
    title="Aumentar fonte"
  >
    A+
  </button>
  <button
    onClick={() => {
      const root = document.documentElement;
      const current = parseInt(root.style.fontSize || '16');
      root.style.fontSize = Math.max(12, current - 2) + 'px';
    }}
    className="w-12 h-12 rounded-full bg-primary text-white shadow-lg hover:scale-110 transition-transform font-bold"
    title="Diminuir fonte"
  >
    A-
  </button>
</div>
    </div>
  );
}
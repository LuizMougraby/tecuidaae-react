import { useState } from "react";
import { useLocation } from "wouter";

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
    address: "Rua Pico das Águas, s/n - Lago Azul",
    phone: "(92) 3182-4567",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "norte",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: true,
    rating: 4.5,
    saturday: true,
    lat: -3.0244,
    lng: -60.0662,
  },
  {
    id: 2,
    name: "UBS Carmen Nicolau",
    address: "Rua Santa Tereza Davila, s/n - Lago Azul",
    phone: "(92) 3182-8901",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "norte",
    services: ["Teste rápido", "Acompanhamento"],
    penicillin: true,
    rating: 4.2,
    saturday: false,
    lat: -3.0244,
    lng: -60.0701,
  },
  {
    id: 3,
    name: "UBS Coroado",
    address: "Av. Cosme Ferreira, 1234 - Coroado",
    phone: "(92) 3182-2345",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "leste",
    services: ["Teste rápido", "Tratamento", "Pré-natal"],
    penicillin: false,
    rating: 3.8,
    saturday: true,
    lat: -3.0833,
    lng: -59.9833,
  },
  {
    id: 4,
    name: "UBS Compensa",
    address: "Rua da Compensa, 567 - Compensa",
    phone: "(92) 3182-6789",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "oeste",
    services: ["Teste rápido", "Tratamento"],
    penicillin: true,
    rating: 4.0,
    saturday: false,
    lat: -3.1167,
    lng: -60.0833,
  },
  {
    id: 5,
    name: "UBS Centro",
    address: "Rua Barroso, 100 - Centro",
    phone: "(92) 3182-1111",
    hours: "24 horas",
    region: "centro",
    services: ["Teste rápido", "Tratamento", "Pré-natal", "Emergência"],
    penicillin: true,
    rating: 4.7,
    saturday: true,
    lat: -3.1019,
    lng: -60.0250,
  },
  {
    id: 6,
    name: "UBS Adrianópolis",
    address: "Av. Umberto Calderaro, 789 - Adrianópolis",
    phone: "(92) 3182-9999",
    hours: "07:00 - 17:00 (Seg-Sex)",
    region: "sul",
    services: ["Teste rápido", "Tratamento"],
    penicillin: true,
    rating: 4.3,
    saturday: true,
    lat: -3.1189,
    lng: -60.0156,
  },
];

export default function Mapa() {
  const [, navigate] = useLocation();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="bg-[#1A315B] p-6 shadow-lg relative">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-80 transition absolute left-6">
              ←
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-white">Mapa das UBSs</h1>
              <p className="text-xl text-white opacity-90">Encontre seu local de atendimento mais próximo</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-1 w-full py-8 px-16">
        {/* Barra de busca */}
        <div className="mb-8 px-4">
          <input
            type="text"
            placeholder="Buscar UBS por nome ou bairro..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-8 py-5 rounded-full border-2 border-gray-200 focus:border-[#6ADE8A] focus:outline-none text-gray-700 text-lg shadow-sm"
          />
        </div>

        {/* Filtros de região */}
        <div className="border-b-2 border-gray-200 mb-8">
          <div className="flex justify-between pb-4 px-12">
            {regions.map((region) => (
              <button
                key={region.value}
                onClick={() => setSelectedRegion(region.value)}
                className={`flex-1 mx-2 py-3 rounded-full font-semibold text-base transition-all duration-200 ${
                  selectedRegion === region.value
                    ? "bg-[#1A315B] text-white border-2 border-[#1A315B]"
                    : "bg-white text-[#1A315B] border-2 border-[#1A315B] hover:bg-[#1A315B] hover:text-white"
                }`}
              >
                {region.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de UBSs */}
        <div className="space-y-6">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center shadow border border-gray-100">
              <p className="text-gray-400">Nenhuma UBS encontrada com esses critérios.</p>
            </div>
          ) : (
            filtered.map((ubs) => (
              <div key={ubs.id} className="bg-white rounded-2xl p-8 shadow-lg border-2 border-[#1A315B] hover:shadow-xl transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#1A315B]">{ubs.name}</h3>
                    <p className="text-base text-gray-500 mt-1">📍 {ubs.address}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex gap-1 justify-end">
                      {Array(5).fill(0).map((_, i) => (
                        <span key={i} className={i < Math.floor(ubs.rating) ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-400">({ubs.rating})</p>
                  </div>
                </div>

                <div className="space-y-2 mb-5 text-base">
                  <p>📞 <a href={`tel:${ubs.phone}`} className="text-[#1A315B] hover:underline font-medium">{ubs.phone}</a></p>
                  <p>🕐 {ubs.hours}</p>
                  {ubs.saturday && <p className="text-[#6ADE8A] font-medium">✅ Abre aos sábados</p>}
                </div>

                <div className="flex flex-wrap gap-2 mb-5">
                  {ubs.services.map((service, idx) => (
                    <span key={idx} className="bg-[#6ADE8A] text-white text-sm px-4 py-2 rounded-full font-medium">
                      {service}
                    </span>
                  ))}
                </div>

                <div className={`p-4 rounded-xl text-base mb-5 font-medium ${
                  ubs.penicillin
                    ? "bg-green-50 border border-[#6ADE8A] text-green-700"
                    : "bg-red-50 border border-red-400 text-red-700"
                }`}>
                  {ubs.penicillin
                    ? "✅ Penicilina disponível"
                    : "⚠️ Estoque de penicilina crítico — Ligar antes"}
                </div>

                <div className="flex gap-4">
                  <a
                    href={`https://www.google.com/maps/search/${encodeURIComponent(ubs.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#1A315B] text-white text-center py-3 rounded-full hover:opacity-90 transition text-base font-semibold"
                  >
                    📍 Como chegar
                  </a>
                  <a
                    href={`tel:${ubs.phone}`}
                    className="flex-1 bg-[#6ADE8A] text-white text-center py-3 rounded-full hover:opacity-90 transition text-base font-semibold"
                  >
                    📞 Ligar
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
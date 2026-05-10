import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";

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
  },
];

export default function Mapa() {
  const [, navigate] = useLocation();
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const regions = [
    { value: "all", label: "Todas" },
    { value: "norte", label: "Norte" },
    { value: "sul", label: "Sul" },
    { value: "leste", label: "Leste" },
    { value: "oeste", label: "Oeste" },
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
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="container flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-2xl hover:opacity-80 transition"
          >
            ←
          </button>
          <div>
            <h1 className="text-xl font-bold">Encontre UBSs em Manaus</h1>
            <p className="text-sm opacity-90">Unidades de Saúde com atendimento para ISTs</p>
          </div>
        </div>
      </header>

      <div className="container py-6 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-lg p-6 shadow">
              <h2 className="font-bold text-lg mb-4 text-primary">Filtros</h2>

              {/* Search */}
              <div className="mb-6">
                <label className="text-sm font-medium block mb-2">Buscar</label>
                <Input
                  placeholder="Nome ou endereço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Region Filter */}
              <div>
                <label className="text-sm font-medium block mb-3">Região</label>
                <div className="space-y-2">
                  {regions.map((region) => (
                    <button
                      key={region.value}
                      onClick={() => setSelectedRegion(region.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition ${
                        selectedRegion === region.value
                          ? "bg-primary text-white font-medium"
                          : "bg-muted text-foreground hover:bg-border"
                      }`}
                    >
                      {region.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* UBS List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {filtered.length === 0 ? (
                <div className="bg-card rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">Nenhuma UBS encontrada com esses critérios.</p>
                </div>
              ) : (
                filtered.map((ubs) => (
                  <div key={ubs.id} className="bg-card rounded-lg p-6 shadow hover:shadow-lg transition border border-border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-bold text-primary">{ubs.name}</h3>
                        <p className="text-sm text-muted-foreground">{ubs.address}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex gap-1 justify-end">
                          {Array(5).fill(0).map((_, i) => (
                            <span key={i} className={i < Math.floor(ubs.rating) ? "text-yellow-400" : "text-gray-300"}>
                              *
                            </span>
                          ))}
                        </div>
                        <p className="text-xs text-muted-foreground">({ubs.rating})</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <p>
                        <strong>Phone:</strong> <a href={`tel:${ubs.phone}`} className="text-primary hover:underline">{ubs.phone}</a>
                      </p>
                      <p>
                        <strong>Hours:</strong> {ubs.hours}
                      </p>
                      {ubs.saturday && <p className="text-success"><strong>Check:</strong> Abre aos sábados</p>}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {ubs.services.map((service, idx) => (
                        <span key={idx} className="bg-secondary text-primary text-xs px-3 py-1 rounded-full">
                          {service}
                        </span>
                      ))}
                    </div>

                    <div className={`p-3 rounded-lg text-sm mb-4 ${
                      ubs.penicillin
                        ? "bg-green-50 border border-success text-success"
                        : "bg-red-50 border border-destructive text-destructive"
                    }`}>
                      {ubs.penicillin
                        ? "OK - Penicilina disponível"
                        : "WARNING - Estoque de penicilina crítico - Ligar antes"}
                    </div>

                    <div className="flex gap-2">
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(ubs.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-primary text-white text-center py-2 rounded-lg hover:bg-[#14919b] transition text-sm font-medium"
                      >
                        MAP - Como chegar
                      </a>
                      <a
                        href={`tel:${ubs.phone}`}
                        className="flex-1 bg-secondary text-primary text-center py-2 rounded-lg hover:bg-opacity-80 transition text-sm font-medium"
                      >
                        CALL - Ligar
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

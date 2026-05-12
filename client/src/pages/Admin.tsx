import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface TriagemStats {
  risco_nivel: string;
  total: number;
}

interface ChatbotStats {
  pergunta: string;
  total: number;
}

interface DailyStats {
  data: string;
  total: number;
}

const COLORS: Record<string, string> = {
  alto: "#FF6B6B",
  moderado: "#FF9800",
  baixo: "#4CAF50",
};

export default function Admin() {
  const [, navigate] = useLocation();
  const [triagem, setTriagem] = useState<TriagemStats[]>([]);
  const [chatbot, setChatbot] = useState<ChatbotStats[]>([]);
  const [daily, setDaily] = useState<DailyStats[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [triagemRes, chatbotRes, dailyRes] = await Promise.all([
          fetch("/api/admin/triagem-stats"),
          fetch("/api/admin/chatbot-stats"),
          fetch("/api/admin/daily-stats"),
        ]);

        const triagemData = await triagemRes.json();
        const chatbotData = await chatbotRes.json();
        const dailyData = await dailyRes.json();

        setTriagem(triagemData);
        setChatbot(chatbotData);
        setDaily(dailyData);
        setTotal(triagemData.reduce((acc: number, d: TriagemStats) => acc + d.total, 0));
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-gray-500 text-lg">Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-[#0D7377] text-white p-5 shadow-lg">
        <div className="container flex items-center gap-4">
          <button onClick={() => navigate("/")} className="text-2xl hover:opacity-80 transition">
            ←
          </button>
          <h1 className="text-xl font-bold">Dashboard Admin</h1>
        </div>
      </header>

      <div className="container py-10 space-y-10">

        {/* Cards de resumo */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow text-center">
            <p className="text-4xl font-bold text-[#0D7377]">{total}</p>
            <p className="text-gray-500 mt-1">Total de Triagens</p>
          </div>
          {triagem.map((t) => (
            <div key={t.risco_nivel} className="bg-white rounded-2xl p-6 shadow text-center">
              <p className="text-4xl font-bold" style={{ color: COLORS[t.risco_nivel] }}>
                {t.total}
              </p>
              <p className="text-gray-500 mt-1 capitalize">Risco {t.risco_nivel}</p>
            </div>
          ))}
        </div>

        {/* Gráfico de pizza - níveis de risco */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold text-gray-700 mb-6">Triagens por Nível de Risco</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={triagem}
                dataKey="total"
                nameKey="risco_nivel"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ risco_nivel, percent }) =>
                  `${risco_nivel} (${(percent * 100).toFixed(0)}%)`
                }
              >
                {triagem.map((entry) => (
                  <Cell key={entry.risco_nivel} fill={COLORS[entry.risco_nivel]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Gráfico de barras - triagens por dia */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold text-gray-700 mb-6">Triagens por Dia</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={daily}>
              <XAxis dataKey="data" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="total" fill="#0D7377" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Perguntas mais feitas no chatbot */}
        {chatbot.length > 0 && (
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-lg font-bold text-gray-700 mb-6">Perguntas Mais Feitas no Chatbot</h2>
            <div className="space-y-3">
              {chatbot.map((c, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <p className="text-gray-700 truncate flex-1">{c.pergunta}</p>
                  <span className="ml-4 bg-[#0D7377] text-white text-sm font-bold px-3 py-1 rounded-full">
                    {c.total}x
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
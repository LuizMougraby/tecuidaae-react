import { useState } from "react";
import { useLocation } from "wouter";

interface Article {
  id: number;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  readTime: number;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: 1,
    title: "Sífilis na Gravidez: Riscos e Prevenção",
    category: "Gravidez",
    excerpt: "Saiba como a sífilis pode afetar a gravidez e como se proteger.",
    content: "A sífilis na gravidez é uma situação que requer atenção especial. Se não tratada, pode causar sérias complicações para o feto, incluindo aborto espontâneo, prematuridade e malformações congênitas. O tratamento com penicilina durante a gravidez é seguro e eficaz.",
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    title: "Sintomas da Sífilis: O que Você Precisa Saber",
    category: "Sintomas",
    excerpt: "Conheça os principais sintomas em cada estágio da doença.",
    content: "A sífilis apresenta diferentes sintomas em cada estágio. Na fase primária, surge uma úlcera indolor. Na secundária, aparecem manchas na pele e febre. Na fase latente, não há sintomas visíveis, mas a bactéria permanece no corpo.",
    readTime: 4,
  },
  {
    id: 3,
    title: "Prevenção de ISTs: Práticas Seguras",
    category: "Prevenção",
    excerpt: "Dicas essenciais para prevenir infecções sexualmente transmissíveis.",
    content: "A prevenção é a melhor estratégia. Use camisinha em todas as relações sexuais, faça testes regularmente, converse com seus parceiros sobre saúde sexual e procure atendimento médico se suspeitar de exposição.",
    readTime: 3,
  },
  {
    id: 4,
    title: "Tratamento da Sífilis: Protocolo do SUS",
    category: "Tratamento",
    excerpt: "Entenda como funciona o tratamento gratuito oferecido pelo SUS.",
    content: "O tratamento da sífilis é realizado com penicilina benzatina, disponível gratuitamente em todas as UBSs. O medicamento é injetável e altamente eficaz. É importante completar todo o tratamento e fazer acompanhamento médico.",
    readTime: 5,
  },
  {
    id: 5,
    title: "Transmissão de Sífilis: Como Ocorre",
    category: "Informações",
    excerpt: "Entenda os mecanismos de transmissão da sífilis.",
    content: "A sífilis é transmitida principalmente por contato sexual direto com feridas infectadas. Também pode ser transmitida de mãe para filho durante a gravidez. Não é transmitida por abraços, beijos ou compartilhamento de objetos.",
    readTime: 4,
  },
  {
    id: 6,
    title: "Testes de Sífilis: Tipos e Precisão",
    category: "Testes",
    excerpt: "Conheça os diferentes tipos de testes disponíveis.",
    content: "Existem dois tipos principais de testes: o teste rápido (resultado em 30 minutos) e o teste de laboratório. Ambos são oferecidos gratuitamente nas UBSs. O diagnóstico precoce é fundamental para o sucesso do tratamento.",
    readTime: 4,
  },
];

const categoryColors: Record<string, string> = {
  Gravidez: "bg-pink-500",
  Sintomas: "bg-orange-500",
  Prevenção: "bg-blue-500",
  Tratamento: "bg-purple-500",
  Informações: "bg-teal-500",
  Testes: "bg-yellow-500",
};

export default function Informacoes() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ["all", "Gravidez", "Sintomas", "Prevenção", "Tratamento", "Informações", "Testes"];

  let filtered = articles;
  if (selectedCategory !== "all") {
    filtered = filtered.filter((a) => a.category === selectedCategory);
  }
  if (searchTerm) {
    filtered = filtered.filter((a) =>
      a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  const featured = filtered.find((a) => a.featured);
  const rest = filtered.filter((a) => !a.featured);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-[#6ADE8A] p-6 shadow-lg relative">
        <div className="container max-w-4xl mx-auto">
          <div className="flex items-center">
            <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-80 transition absolute left-6">
              ←
            </button>
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-white">Informações</h1>
              <p className="text-xl text-white opacity-90">Tudo sobre Sífilis, baseado nos protocolos do Ministério da Saúde</p>
            </div>
          </div>
        </div>
      </header>

      {selectedArticle ? (
        <div className="flex-1 container max-w-4xl mx-auto py-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-[#6ADE8A] hover:underline font-medium"
          >
            ← Voltar aos artigos
          </button>
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 max-w-3xl">
            <div className="mb-4">
              <span className={`${categoryColors[selectedArticle.category] || "bg-gray-500"} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                {selectedArticle.category}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{selectedArticle.title}</h1>
            <div className="text-sm text-gray-400 mb-6 pb-6 border-b border-gray-100">
              ⏱ {selectedArticle.readTime} min de leitura
            </div>
            <div className="text-gray-700 leading-relaxed">
              <p>{selectedArticle.content}</p>
              <div className="mt-8 p-4 bg-[#6ADE8A] bg-opacity-10 border border-[#6ADE8A] rounded-xl">
                <p className="text-sm">
                  <strong>Precisa de atendimento?</strong> Procure a UBS mais próxima ou ligue 192 em caso de emergência.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 container max-w-5xl mx-auto py-8">
          {/* Barra de busca */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Buscar artigos (ex: sintomas, tratamento, gravidez...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-5 py-3 rounded-full border-2 border-gray-200 focus:border-[#6ADE8A] focus:outline-none text-gray-700"
            />
          </div>

          {/* Abas de categoria */}
          <div className="border-b-2 border-gray-200 mb-8">
            <div className="flex flex-wrap gap-2 pb-3">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-[#6ADE8A] text-white border-2 border-[#6ADE8A]"
                      : "bg-white text-[#6ADE8A] border-2 border-[#6ADE8A] hover:bg-[#6ADE8A] hover:text-white"
                  }`}
                >
                  {cat === "all" ? "Todos" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Artigo destaque */}
          {featured && (
            <button
              onClick={() => setSelectedArticle(featured)}
              className="w-full text-left bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-8 hover:shadow-xl transition"
            >
              <div className={`${categoryColors[featured.category] || "bg-gray-500"} p-10`} />
              <div className="p-6">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase">
                  DESTAQUE
                </span>
                <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">{featured.title}</h2>
                <p className="text-gray-500 mb-4">{featured.excerpt}</p>
                <span className="text-[#6ADE8A] font-semibold">Ler artigo completo →</span>
              </div>
            </button>
          )}

          {/* Grid de artigos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="text-left bg-white rounded-2xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition"
              >
                <div className={`${categoryColors[article.category] || "bg-gray-500"} p-8`} />
                <div className="p-5">
                  <span className={`${categoryColors[article.category] || "bg-gray-500"} text-white px-3 py-1 rounded-full text-xs font-medium`}>
                    {article.category}
                  </span>
                  <h3 className="text-lg font-bold text-gray-800 mt-3 mb-1">{article.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">⏱ {article.readTime} min de leitura</span>
                    <span className="text-[#6ADE8A] font-semibold text-sm">Saiba mais →</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              Nenhum artigo encontrado.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
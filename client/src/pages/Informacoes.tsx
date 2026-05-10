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
    title: "Sífilis na Gravidez: Protegendo Mães e Bebês",
    category: "Tratamento",
    excerpt: "A detecção precoce e o tratamento adequado durante o pré-natal são essenciais para prevenir a transmissão vertical da sífilis.",
    content: "A sífilis na gravidez requer atenção especial. Se não tratada, pode causar complicações sérias para o bebê. O tratamento com penicilina durante a gravidez é seguro e eficaz.",
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    title: "O que é Sífilis",
    category: "Conceitos Básicos",
    excerpt: "A sífilis é uma infecção causada pela bactéria Treponema pallidum. Conheça suas fases, sintomas e como ela afeta o organismo.",
    content: "A sífilis apresenta diferentes sintomas em cada estágio. Na fase primária, surge uma úlcera indolor. Na secundária, aparecem manchas na pele e febre. Na fase latente, não há sintomas visíveis.",
    readTime: 4,
  },
  {
    id: 3,
    title: "Prevenção contra a Sífilis",
    category: "Prevenção",
    excerpt: "Prevenir a sífilis é simples e eficaz. Conheça os métodos de proteção, a importância do uso de preservativos e dos testes regulares.",
    content: "A prevenção é a melhor estratégia. Use camisinha em todas as relações sexuais, faça testes regularmente e converse com seus parceiros sobre saúde sexual.",
    readTime: 3,
  },
  {
    id: 4,
    title: "Tratamento contra a Sífilis",
    category: "Tratamento",
    excerpt: "O tratamento da sífilis é simples, gratuito e altamente eficaz. Entenda como funciona o tratamento com penicilina benzatina.",
    content: "O tratamento da sífilis é realizado com penicilina benzatina, disponível gratuitamente em todas as UBSs. É importante completar todo o tratamento e fazer acompanhamento médico.",
    readTime: 5,
  },
  {
    id: 5,
    title: "Mitos e Verdades sobre a Sífilis",
    category: "Mitos vs Fatos",
    excerpt: "Existem muitas informações incorretas sobre a sífilis. Separamos os principais mitos e as verdades científicas sobre a doença.",
    content: "Mito: sífilis só afeta quem tem muitos parceiros. Verdade: qualquer pessoa sexualmente ativa pode contrair sífilis. Mito: dá para ver se alguém tem sífilis. Verdade: muitas pessoas não apresentam sintomas visíveis.",
    readTime: 5,
  },
];

const categoryColors: Record<string, string> = {
  "Conceitos Básicos": "bg-[#6ADE8A]",
  "Tratamento": "bg-[#6ADE8A]",
  "Prevenção": "bg-[#6ADE8A]",
  "Mitos vs Fatos": "bg-[#6ADE8A]",
};

export default function Informacoes() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ["all", "Conceitos Básicos", "Tratamento", "Prevenção", "Mitos vs Fatos"];
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
        <div className="flex-1 w-full py-8 px-16">
          {/* Barra de busca */}
          <div className="mb-8 px-4">
  <input
    type="text"
    placeholder="Buscar artigos (ex: sintomas, tratamento, gravidez...)"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full px-8 py-5 rounded-full border-2 border-gray-200 focus:border-[#6ADE8A] focus:outline-none text-gray-700 text-lg shadow-sm"
  />
</div>

          {/* Abas de categoria */}
          <div className="border-b-2 border-gray-200 mb-10">
  <div className="flex justify-between pb-4 px-12">
    {categories.map((cat) => (
      <button
        key={cat}
        onClick={() => setSelectedCategory(cat)}
        className={`flex-1 mx-2 py-3 rounded-full font-semibold text-base transition-all duration-200 ${
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
  className="w-full text-left bg-white rounded-2xl shadow-lg border-2 border-[#6ADE8A] overflow-hidden mb-8 hover:shadow-xl transition"
>
  <div className="flex">
    {/* Espaço reservado para imagem — lado esquerdo */}
    <div className={`${categoryColors[featured.category] || "bg-[#6ADE8A]"} w-1/2 min-h-[280px]`} />
    {/* Conteúdo — lado direito */}
    <div className="w-1/2 p-8 flex flex-col justify-center">
      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-bold uppercase w-fit">
        DESTAQUE
      </span>
      <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">{featured.title}</h2>
      <p className="text-gray-500 mb-4">{featured.excerpt}</p>
      <span className="text-[#6ADE8A] font-semibold">Ler artigo completo →</span>
    </div>
  </div>
</button>
          )}

          {/* Grid de artigos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 auto-rows-fr">
            {rest.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="text-left bg-white rounded-2xl shadow border-2 border-[#6ADE8A] overflow-hidden hover:shadow-xl transition"
              >
                <div className={`${categoryColors[article.category] || "bg-gray-500"} min-h-[200px]`} />
                <div className="p-8">
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
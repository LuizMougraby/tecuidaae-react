import { useState } from "react";
import { useLocation } from "wouter";
import { Input } from "@/components/ui/input";

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
        <p className="text-xl text-white opacity-90">Tudo sobre Sífilis, desde a sua prevenção até tratamento, todas baseado nos protocolos do Ministério da Saúde e OMS</p>
      </div>
    </div>
  </div>
</header>

      {selectedArticle ? (
        <div className="flex-1 container py-8">
          <button
            onClick={() => setSelectedArticle(null)}
            className="mb-6 text-primary hover:underline font-medium"
          >
            ← Voltar aos artigos
          </button>

          <div className="bg-card rounded-lg p-8 shadow max-w-3xl">
            <div className="mb-4">
              <span className="bg-secondary text-primary px-3 py-1 rounded-full text-sm font-medium">
                {selectedArticle.category}
              </span>
            </div>

            <h1 className="text-3xl font-bold text-primary mb-4">{selectedArticle.title}</h1>

            <div className="text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
              Tempo de leitura: {selectedArticle.readTime} minutos
            </div>

            <div className="prose prose-sm max-w-none text-foreground leading-relaxed">
              <p>{selectedArticle.content}</p>

              <div className="mt-8 p-4 bg-secondary bg-opacity-10 border border-secondary rounded-lg">
                <p className="text-sm">
                  <strong>Precisa de atendimento?</strong> Procure a UBS mais próxima de você ou ligue 192 em caso de emergência.
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

  {/* Articles */}
  <div className="lg:col-span-3">

            {/* Articles */}
            <div className="lg:col-span-3">
              <div className="space-y-4">
                {filtered.length === 0 ? (
                  <div className="bg-card rounded-lg p-8 text-center">
                    <p className="text-muted-foreground">Nenhum artigo encontrado.</p>
                  </div>
                ) : (
                  filtered.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article)}
                      className={`w-full text-left bg-card rounded-lg p-6 shadow hover:shadow-lg transition border border-border ${
                        article.featured ? "border-secondary border-2" : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-primary">{article.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{article.excerpt}</p>
                        </div>
                        {article.featured && (
                          <span className="bg-secondary text-primary px-2 py-1 rounded text-xs font-bold whitespace-nowrap ml-4">
                            DESTAQUE
                          </span>
                        )}
                      </div>

                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-border">
                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {article.readTime} min de leitura
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

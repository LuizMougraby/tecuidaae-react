import { useState } from "react";
import { useLocation } from "wouter";
import imgDestaque from "@/assets/Destaque.jpg";
import imgConceitosBasicos from "@/assets/Conceito Básico.jpg";
import imgPrevencao from "@/assets/Prevenção.jpg";
import imgTratamento from "@/assets/Tratamento.jpg";
import imgMitosFatos from "@/assets/Mistos vs Verdades.jpg";
import imgSaudeMental from "@/assets/Saúde Mental.jpg";
import imgTesteRapido from "@/assets/Teste Rápido.jpg";

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
    category: "Gravidez",
    excerpt: "A detecção precoce e o tratamento adequado durante o pré-natal são essenciais para prevenir a transmissão vertical da sífilis.",
    content: `A sífilis na gravidez é uma das situações que exige maior atenção médica. A bactéria Treponema pallidum pode ser transmitida da mãe para o bebê durante a gestação ou no parto, causando a chamada sifílis congênita.
    
    Riscos para o bebê:
    A sífilis cogênita pode causar aborto espontâneo, natimorto (bebê que nasce morto), prematuridade, baixo pesa ao nasccer, malformações ósseas, problemas neurológicos, surdez e cegueira.
    
    Importância do pré-natal:
    O teste para sífilis deve ser realizado no início da gestação, so segundo trimestre e próximo ao parto. O diagnóstico precoce permite o tratamento imediato e eficaz.
    
    Tratamento durante a gravidez:
    O tratamento é feito com penicilina benzatina, que é segura para a mãe e para o bebê. A dose e duração dependem do estágio da doença. O parceiro também deve ser tartado para evitar reinfecção.
    
    Prevenção:
    Faça o pré-natal regularmente, realize todos os exames solicitados, use preservativo e trate qualquer IST antes ou durante a gestação.`,
    readTime: 5,
    featured: true,
  },
  {
    id: 2,
    title: "O que é Sífilis",
    category: "Conceitos Básicos",
    excerpt: "A sífilis é uma infecção causada pela bactéria Treponema pallidum. Conheça suas fases, sintomas e como ela afeta o organismo.",
    content: `A sífilis é uma infecção sexualmente transmissível (IST) causada pela bactéria Treponema pallidum. È uma doença antiga, conhecida há séculos, mas que ainda representa um sério problema de saúde pública.
    
    Fases da sífilis:
    Surge entre 10 e 90 dias após a infecção. O principal sinal é uma ferida (cancro duro) no local de entrada da bactéria os genitais, ânus ou boca. Essa ferida é indolor e desparece sozinha, mas isso não significa cura.
    
    Sífilis Secundária:
    Ocorre semanas ou meses depois. Aparecem manchas avermelhadas na pele, incluvise nas palmas das mãos e plantas dos pés. Pode haver febre, mal-estar, queda de cabelo e ínguas. Os sintomas também desaparecem sem tratamento.
    
    Sífilis Latente:
    Período sem sitomas. Pode durar anos. A doença ainda está presente no organismo e pode progredir.

    Sífilis Terciária:
    Estágio mais grave. Pode afetar o coração, cérebro, ossos e outros órgãos, causando danos irreversíveis e até morte.
    
    Como é transmitida:
    A transmissão ocorre pelo contato sexual direto com as feridas, sem uso de preservativo. Também pode ser transmitida da mãe para o bebê durante a gravidez ou parto.`,
    readTime: 6,
  },
  {
    id: 3,
    title: "Prevenção contra a Sífilis",
    category: "Prevenção",
    excerpt: "Prevenir a sífilis é simples e eficaz. Conheça os métodos de proteção, a importância do uso de preservativos e dos testes regulares.",
    content: `A prevenção da sífilis é possível e acessível. Adotar práticas seguras no dia a dia reduz significativamente o risco de infecção.

Use preservativo:
O preservativo (camisinha) masculino ou feminino é o método mais eficaz para prevenir a sífilis e outras ISTs. Use em todas as relações sexuais, incluindo sexo oral e anal.

Faça testes regularmente:
Pessoas sexualmente ativas devem realizar testes para sífilis pelo menos uma vez por ano. Gestantes devem testar no início do pré-natal, no segundo trimestre e próximo ao parto. O teste rápido é gratuito nas UBSs e o resultado sai em 30 minutos.

Converse com seu parceiro:
Dialogue abertamente sobre saúde sexual. Pergunte sobre o histórico de ISTs e incentive seu parceiro a fazer testes regularmente.

Evite compartilhar objetos:
Não compartilhe agulhas, seringas ou outros objetos que possam ter contato com sangue.

Tratamento como prevenção:
Se você ou seu parceiro for diagnosticado com sífilis, ambos devem ser tratados ao mesmo tempo para evitar reinfecção.

Procure atendimento:
Ao notar qualquer ferida, mancha ou sintoma incomum nos genitais, ânus ou boca, procure uma UBS imediatamente.`,
    readTime: 5,
  },
  {
    id: 4,
    title: "Tratamento contra a Sífilis",
    category: "Tratamento",
    excerpt: "O tratamento da sífilis é simples, gratuito e altamente eficaz. Entenda como funciona o tratamento com penicilina benzatina.",
    content: `A boa notícia é que a sífilis tem cura! O tratamento é simples, gratuito pelo SUS e altamente eficaz quando feito corretamente.

Medicamento utilizado:
A penicilina benzatina é o antibiótico padrão para o tratamento da sífilis. É aplicada por injeção intramuscular e está disponível gratuitamente em todas as Unidades Básicas de Saúde (UBSs).

Doses e duração:
Sífilis primária e secundária: dose única de 2,4 milhões de unidades.
Sífilis latente recente (menos de 1 ano): dose única de 2,4 milhões de unidades.
Sífilis latente tardia ou de duração desconhecida: 3 doses semanais de 2,4 milhões de unidades.
Sífilis terciária: tratamento mais prolongado, com acompanhamento especializado.

Alergia à penicilina:
Em casos de alergia, o médico pode indicar outros antibióticos como doxiciclina ou azitromicina.

Tratamento do parceiro:
É fundamental que o parceiro sexual também seja tratado, mesmo que não apresente sintomas, para evitar reinfecção.

Acompanhamento:
Após o tratamento, é necessário fazer exames de acompanhamento nos meses seguintes para confirmar a cura.

Importante:
Não interrompa o tratamento antes do prazo indicado. Não automédique. Procure sempre orientação médica.`,
    readTime: 6,
  },
  {
    id: 5,
    title: "Mitos e Verdades sobre a Sífilis",
    category: "Mitos vs Fatos",
    excerpt: "Existem muitas informações incorretas sobre a sífilis. Separamos os principais mitos e as verdades científicas sobre a doença.",
    content: `Existem muitos mitos sobre a sífilis que podem prejudicar a prevenção e o tratamento. Veja os principais:

MITO: A sífilis só afeta quem tem muitos parceiros sexuais.
VERDADE: Qualquer pessoa sexualmente ativa pode contrair sífilis, independentemente do número de parceiros.

MITO: Dá para ver se alguém tem sífilis.
VERDADE: A maioria das pessoas infectadas não apresenta sintomas visíveis, especialmente na fase latente. Por isso os testes são essenciais.

MITO: Se a ferida sumiu, a doença passou.
VERDADE: Os sintomas da sífilis desaparecem sozinhos, mas isso não significa cura. A bactéria continua no organismo e a doença progride silenciosamente.

MITO: A sífilis só é transmitida por penetração.
VERDADE: A sífilis pode ser transmitida pelo contato com feridas durante qualquer prática sexual, incluindo sexo oral e anal.

MITO: Quem já teve sífilis fica imune.
VERDADE: Não existe imunidade. Após o tratamento e cura, é possível se infectar novamente.

MITO: Preservativo não protege contra sífilis.
VERDADE: O preservativo é o método mais eficaz de proteção contra a sífilis e outras ISTs.

MITO: A sífilis não tem cura.
VERDADE: A sífilis tem cura com tratamento adequado à base de penicilina, disponível gratuitamente no SUS.`,
    readTime: 5,
  },
  {
     id: 7,
    title: "Sífilis e Saúde Mental: O Impacto Emocional",
    category: "Saúde Mental",
    excerpt: "Um diagnóstico de sífilis pode gerar ansiedade e estigma. Saiba como lidar com o impacto emocional e buscar apoio.",
    content: `Receber um diagnóstico de sífilis pode ser emocionalmente difícil. O estigma social em torno das ISTs frequentemente gera sentimentos de vergonha, culpa e ansiedade. É importante saber que você não está sozinho e que buscar ajuda é o caminho certo.

Sentimentos comuns após o diagnóstico:
Medo e ansiedade sobre a saúde e o futuro. Vergonha ou culpa. Preocupação com o julgamento de parceiros ou familiares. Dificuldade em comunicar o diagnóstico ao parceiro.

Como lidar:
Lembre-se que a sífilis é uma doença tratável e curável. Procure apoio psicológico se necessário, muitas UBSs oferecem esse serviço gratuitamente. Converse com profissionais de saúde de confiança. Não se isole.

Comunicando ao parceiro:
Informar o parceiro é fundamental e um ato de responsabilidade. Escolha um momento tranquilo para conversar. Seja direto e honesto. Lembre que o parceiro também precisa ser testado e tratado.

Apoio disponível:
As UBSs oferecem atendimento sigiloso e humanizado. Profissionais de saúde estão preparados para ajudar sem julgamentos.`,
    readTime: 4,
  },
  {
    id: 8,
    title: "Teste Rápido para Sífilis: Como Funciona",
    category: "Teste Rápido",
    excerpt: "O teste rápido para sífilis é gratuito, rápido e disponível em todas as UBSs. Saiba como funciona e por que fazê-lo.",
    content: `O teste rápido para sífilis é uma das ferramentas mais importantes no combate à doença. É simples, gratuito e o resultado sai em até 30 minutos.

Como funciona:
Uma pequena amostra de sangue é coletada da ponta do dedo. A amostra é colocada em um dispositivo de teste. Em 15 a 30 minutos o resultado fica disponível.

Quem deve fazer o teste:
Pessoas sexualmente ativas, especialmente sem uso regular de preservativo. Gestantes — obrigatoriamente no pré-natal. Pessoas com múltiplos parceiros. Parceiros de pessoas diagnosticadas com sífilis. Qualquer pessoa que queira conhecer sua situação sorológica.

Onde fazer:
O teste é gratuito em todas as Unidades Básicas de Saúde (UBSs). Não é necessário agendamento na maioria dos casos.

O que fazer com o resultado:
Positivo: procure o médico imediatamente para iniciar o tratamento. Negativo: mantenha as práticas de prevenção e repita o teste periodicamente.

Frequência recomendada:
Pessoas sexualmente ativas devem fazer o teste pelo menos uma vez por ano. Gestantes devem fazer em cada trimestre da gravidez.`,
    readTime: 4,
  },
];

const categoryColors: Record<string, string> = {
  "Gravidez": "bg-[#6ADE8A]",
  "Conceitos Básicos": "bg-[#6ADE8A]",
  "Tratamento": "bg-[#6ADE8A]",
  "Prevenção": "bg-[#6ADE8A]",
  "Mitos vs Fatos": "bg-[#6ADE8A]",
  "Saúde Mental": "bg-[#6ADE8A]",
  "Teste Rápido": "bg-[#6ADE8A]",
};

export default function Informacoes() {
  const [, navigate] = useLocation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const categories = ["all", "Conceitos Básicos", "Tratamento", "Prevenção", "Mitos vs Fatos", "Saúde Mental", "Teste Rápido"];
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
  const articleImages: Record<string, string> = {
  "Gravidez": imgDestaque,
  "Tratamento": imgTratamento,
  "Conceitos Básicos": imgConceitosBasicos,
  "Prevenção": imgPrevencao,
  "Mitos vs Fatos": imgMitosFatos,
  "Saúde Mental": imgSaudeMental,
  "Teste Rápido": imgTesteRapido,

};
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
            <div className="text-gray-700 leading-relaxed text-justify">
              {selectedArticle.content.split(/\n\n/).filter(p => p.trim()).map((paragraph, idx) => (
                <div key={idx} className="mb-4">
                  {paragraph.trim().split('\n').map((line, lineIdx) => (
                    <p key={lineIdx}>{line.trim()}</p>
                  ))}
                </div>
              ))}
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
    <div className="w-1/2 min-h-[350px]" style={{ backgroundImage: `url(${articleImages[featured.category]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
    {/* Conteúdo — lado direito */}
    <div className="w-1/2 p-10 flex flex-col justify-center gap-4">
      <span className="bg-[#6ADE8A] text-white px-6 py-2 rounded-full text-base font-bold uppercase w-fit">
        DESTAQUE
      </span>
      <h2 className="text-3xl font-bold text-gray-800 mt-3 mb-2">{featured.title}</h2>
      <p className="text-lg gray-500 mb-4">{featured.excerpt}</p>
      <span className="text-[#6ADE8A] font-semibold">Ler artigo completo →</span>
    </div>
  </div>
</button>
          )}

          {/* Grid de artigos */}
          <div className="grid grid-cols-2 gap-8">
            {rest.map((article) => (
              <button
                key={article.id}
                onClick={() => setSelectedArticle(article)}
                className="text-left bg-white rounded-2xl shadow border-2 border-[#6ADE8A] overflow-hidden hover:shadow-xl transition"
              >
                <div className="min-h-[250px]" style={{ backgroundImage: `url(${articleImages[article.category]})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="p-8">
                  <span className={`${categoryColors[article.category] || "bg-gray-500"} text-white px-6 py-2 rounded-full text-lg font-semibold w-fit`}>
                    {article.category}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800 mt-4 mb-2">{article.title}</h3>
                  <p className="text-lg text-gray-500 mb-4">{article.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-400">⏱ {article.readTime} min de leitura</span>
                    <span className="text-[#6ADE8A] font-semibold text-base">Saiba mais →</span>
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
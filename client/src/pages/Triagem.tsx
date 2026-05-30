import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTriagemDB } from "@/hooks/useTriagemDB";
import imgtriagem from "@/assets/IMG-20260512-WA0026.jpg";

interface Answer {
  [key: number]: string;
}

export default function Triagem() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [riskScore, setRiskScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const { salvarResultado } = useTriagemDB();

  const totalSteps = 8;

  const questions = [
    {
      step: 1,
      question: "Qual é a sua faixa etária?",
      options: [
        { label: "Menos de 18 anos", value: "menor", points: 0 },
        { label: "18 a 29 anos", value: "jovem", points: 0 },
        { label: "30 anos ou mais", value: "adulto", points: 0 }
      ],
    },
  {
    step: 2,
    question: "Você tem ou teve alguma ferida, úlcera ou bolha nos genitais, ânus ou boca?",
    options: [
      { label: "Sim, atualmente", value: "sim_atual", points: 3 },
      { label: "Já tive, mas sumiu", value: "ja_tive", points: 2 },
      { label: "Não, nunca tive", value: "nao", points: 0 },
    ],
  },
  {
    step: 3,
    question: "Você teve relação sexual sem preservativo nos últimos 3 meses?",
    options: [
      { label: "Sim", value: "sim", points: 3 },
      { label: "Não", value: "nao", points: 0 },
      { label: "Já tive sífilis antes", value: "ja_tive", points: 3 },
    ],
  },
  {
    step: 4,
    question: "Você apresenta manchas avermelhadas na pele, febre ou mal-estar recente?",
    options: [
      { label: "Sim", value: "sim", points: 2 },
      { label: "Não", value: "nao", points: 0 },
    ],
  },
  {
    step: 5,
    question: "Você ou seu parceiro(a) foi diagnosticado(a) com alguma IST recentemente?",
    options: [
      { label: "Sim", value: "sim", points: 3 },
      { label: "Não", value: "nao", points: 0 },
      { label: "Não sei", value: "nao_sei", points: 1 },
    ],
  },
  {
    step: 6,
    question: "Você está grávida ou tentando engravidar?",
    options: [
      { label: "Sim, estou grávida", value: "gravida", points: 3 },
      { label: "Estou tentando", value: "tentando", points: 2 },
      { label: "Não", value: "nao", points: 0 },
    ],
  },
  {
    step: 7,
    question: "Você já realizou algum teste para sífilis?",
    options: [
      { label: "Sim, e deu negativo", value: "negativo", points: 0 },
      { label: "Sim, e deu positivo", value: "positivo", points: 3 },
      { label: "Nunca fiz teste", value: "nunca", points: 2 },
    ],
  },
  {
    step: 8,
    question: "Você tem múltiplos parceiros sexuais ou parceiro(a) com múltiplos parceiros?",
    options: [
      { label: "Sim", value: "sim", points: 2 },
      { label: "Não", value: "nao", points: 0 },
      { label: "Prefiro não responder", value: "nao_resp", points: 1 },
    ],
  },
];

 const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentStep]: value }));
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRiskLevel = () => {
    if (riskScore >= 7) return { level: "alto", title: "Risco Alto Detectado" };
    if (riskScore >= 3) return { level: "moderado", title: "Risco Moderado" };
    return { level: "baixo", title: "Baixo Risco" };
  };

  const isMenor = answers[1] === "menor";
  const risk = getRiskLevel();
  const progress = (currentStep / totalSteps) * 100;

  if (showResult) {
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundImage: `url(${imgtriagem})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <header className="bg-[#51CA74] p-4 sm:p-6 shadow-lg relative">
  <div className="container max-w-4xl mx-auto">
    <div className="flex items-center">
      <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-90 transition absolute left-4 sm:left-6 min-w-[48px] min-h-[48px] flex items-center justify-center">
        ←
      </button>
      <div className="flex-1 text-center px-12">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Resultado da Triagem</h1>
        <p className="text-sm sm:text-xl text-white opacity-90">Baseado nas suas respostas</p>
      </div>
    </div>
  </div>
</header>

        <div className="flex-1 container py-6 sm:py-12 px-4 sm:px-6 flex items-center justify-center">
  <div className="max-w-2xl w-full rounded-3xl p-4 sm:p-6" style={{ backgroundColor: "rgba(255,255,255,0.85)" }}>
    <div
      className={`rounded-2xl p-4 sm:p-8 text-center ${
        risk.level === "alto"
          ? "bg-red-500 text-white"
          : risk.level === "moderado"
          ? "bg-orange-400 text-white"
          : "bg-green-500 text-white"
      }`}
    >
      <div className="text-4xl sm:text-6xl mb-3 sm:mb-4"></div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{risk.title}</h2>

              {risk.level === "alto" && (
  <div className="space-y-4 text-left">
    <p className="text-xl">Com base nas suas respostas, você apresenta sinais de alto risco. Procure atendimento médico o quanto antes.</p>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Ação Imediata:</p>
      <p className="text-base">Dirija-se à UBS mais próxima hoje mesmo. O tratamento é gratuito, confidencial e altamente eficaz.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Emergência:</p>
      <p className="text-base">Se não puder ir pessoalmente, ligue 192 (SAMU) ou procure o pronto-socorro mais próximo.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold txt-lg"> Tratamento:</p>
      <p className="text-base">A sífilis tem cura! O tratamento com penicilina benzatina é gratuito no SUS e muito eficaz quando iniciado cedo.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Parceiro(a):</p>
      <p className="text-base">Informe seu parceiro(a) para que ele(a) também seja testado(a) e tratado(a) se necessário.</p>
    </div>
  </div>
)}

              {risk.level === "moderado" && (
  <div className="space-y-4 text-left">
    <p className="text-xl">Você apresenta alguns fatores de risco. Recomendamos fazer o teste de sífilis nas próximas 48 horas.</p>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Teste Rápido:</p>
      <p>O teste é gratuito, resultado em 30 minutos e disponível em todas as UBSs. Não precisa de agendamento.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Prevenção:</p>
      <p className="text-base">Use preservativo em todas as relações sexuais até confirmar seu estado de saúde.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Parceiro(a):</p>
      <p className="text-base">Converse com seu parceiro(a) sobre saúde sexual e incentive-o(a) a fazer o teste também.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Acompanhamento:</p>
      <p className="text-base">Mesmo que o teste dê negativo, mantenha o acompanhamento médico regular e repita o teste a cada 6 meses.</p>
    </div>
  </div>
)}

              {risk.level === "baixo" && (
  <div className="space-y-4 text-left">
    <p className="text-xl">Ótima notícia! Suas respostas indicam baixo risco. Continue mantendo hábitos saudáveis de prevenção.</p>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Continue Assim:</p>
      <p className="text-base">Use preservativo em todas as relações sexuais, incluindo sexo oral e anal.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Teste Regular:</p>
      <p className="text-base">Faça o teste para sífilis pelo menos uma vez por ano se tiver vida sexual ativa. É gratuito nas UBSs.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Diálogo:</p>
      <p className="text-base">Converse abertamente com seus parceiros sobre saúde sexual e ISTs.</p>
    </div>
    <div className="bg-white bg-opacity-40 rounded-lg p-4 space-y-2 text-gray-800">
      <p className="font-bold text-lg"> Informação:</p>
      <p className="text-base">Acesse nossa página de Informações para aprender mais sobre prevenção e sintomas da sífilis.</p>
    </div>
  </div>
)}
              <div className="mt-4 bg-white bg-opacity-40 rounded-lg p-4 text-gray-800">
  <p className="font-bold text-lg mb-2"> Aviso importante:</p>
  <p className="text-base">Esta triagem é apenas uma ferramenta de orientação inicial e não substitui o diagnóstico médico.</p>
</div>
{isMenor && risk.level === "alto" && (
  <div className="mt-4 bg-yellow-400 rounded-lg p-4 text-gray-900">
    <p className="font-bold text-lg mb-1"> Atenção — Menor de idade:</p>
    <p className="text-base">Por ser menor de 18 anos e apresentar sintomas graves, você deve comparecer à UBS <strong>acompanhado(a) de um responsável maior de idade.</strong></p>
  </div>
)}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8">
  <button
    onClick={() => navigate("/mapa")}
    className="flex-1 bg-[#51CA74] text-white py-3 rounded-full font-semibold text-base sm:text-lg min-h-[48px] hover:opacity-90 transition"
  >
     Encontrar UBS
  </button>
  <button
    onClick={() => { setShowResult(false); setCurrentStep(1); setAnswers({}); setRiskScore(0); }}
    className="flex-1 bg-white text-[#51CA74] border-2 border-[#51CA74] py-3 rounded-full font-semibold text-base sm:text-lg min-h-[48px] hover:bg-[#51CA74] hover:text-white transition"
  >
     Refazer Triagem
  </button>
  <button
    onClick={() => navigate("/")}
    className="flex-1 bg-white text-gray-600 border-2 border-gray-300 py-3 rounded-full font-semibold text-base sm:text-lg min-h-[48px] hover:bg-gray-100 transition"
  >
     Voltar ao Início
  </button>
</div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions.find((q) => q.step === currentStep);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: `url(${imgtriagem})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div>
        {/* Header */}
        <header className="bg-[#51CA74] p-4 sm:p-6 shadow-lg relative">
  <div className="container max-w-4xl mx-auto">
    <div className="flex items-center">
      <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-80 transition absolute left-4 sm:left-6 min-w-[48px] min-h-[48px] flex items-center justify-center">
        ←
      </button>
      <div className="flex-1 text-center px-12">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Triagem</h1>
        <p className="text-sm sm:text-xl text-white opacity-90">Avalie seu risco para sífilis em algumas perguntas rápidas</p>
      </div>
    </div>
  </div>
</header>

        {/* Barra de progresso */}
        <div className="flex justify-center mt-4 px-8">
          <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
            <div
              className="bg-[#51CA74] h-4 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Card de perguntas */}
      <div className="flex-1 container max-w-4xl mx-auto py-4 sm:py-10 px-4 sm:px-6">
  {currentQuestion && (
    <div className="rounded-2xl p-6 sm:p-12 shadow-xl min-h-[400px] sm:min-h-[500px] flex flex-col justify-center gap-4 sm:gap-8" style={{ backgroundColor: "rgba(255,255,255,0.80)" }}>
      <p className="text-sm sm:text-base font-bold text-gray-500 uppercase tracking-wide mb-1 sm:mb-2">
        Pergunta {currentStep}
      </p>
      <h2 className="text-base sm:text-xl font-normal text-gray-700 mb-4 sm:mb-8">
        {currentQuestion.question}
      </h2>
      {/* Opções */}
      <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3 mb-4 sm:mb-8">
        {currentQuestion.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleAnswer(option.value)}
            className={
              answers[currentStep] === option.value
                ? "w-full sm:w-auto px-6 py-3 rounded-full border-2 font-semibold transition-all duration-200 border-[#51CA74] bg-[#51CA74] text-white text-base sm:text-lg min-h-[48px]"
                : "w-full sm:w-auto px-6 py-3 rounded-full border-2 font-semibold transition-all duration-200 border-white bg-white text-gray-700 hover:border-[#51CA74] hover:bg-[#51CA74] hover:text-white text-base sm:text-lg min-h-[48px]"
            }
          >
            {option.label}
          </button>
        ))}
      </div>

            {/* Botões Voltar e Próximo */}
<div className="flex gap-3 sm:gap-4 mt-auto">
  <button
    onClick={handlePrev}
    disabled={currentStep === 1}
    className="flex-1 border-2 border-white bg-white text-gray-600 py-3 rounded-full font-semibold text-base sm:text-lg min-h-[48px] hover:bg-opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
  >
    Voltar
  </button>
  <button
    onClick={async () => {
  if (!answers[currentStep]) return;
  if (currentStep < totalSteps) {
    setCurrentStep(s => s + 1);
  } else {
    const totalScore = Object.entries(answers).reduce((acc, [step, value]) => {
      const question = questions.find(q => q.step === Number(step));
      const option = question?.options.find(o => o.value === value);
      return acc + (option?.points ?? 0);
    }, 0);
    setRiskScore(totalScore);

    const nivel = totalScore >= 7 ? "alto" : totalScore >= 3 ? "moderado" : "baixo";

    await salvarResultado({
      respostas: answers,
      riscoScore: totalScore,
      riscoNivel: nivel,
    });

    setShowResult(true);
  }
}}
                disabled={!answers[currentStep]}
                className="flex-1 bg-[#51CA74] text-white py-3 rounded-full font-semibold text-lg hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {currentStep === totalSteps ? "Ver Resultado" : "Próximo"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

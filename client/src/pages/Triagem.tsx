import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";

interface Answer {
  [key: number]: string;
}

export default function Triagem() {
  const [, navigate] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer>({});
  const [riskScore, setRiskScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const totalSteps = 5;

  const questions = [
    {
      step: 1,
      question: "Você teve relação sexual sem proteção nos últimos 3 meses?",
      options: [
        { label: "Não", value: "nao", points: 0 },
        { label: "Sim", value: "sim", points: 3 },
        { label: "Já tive sífilis antes", value: "ja", points: 3 },
      ],
    },
    {
      step: 2,
      question: "Você ou seu parceiro apresenta feridas nos genitais?",
      options: [
        { label: "Não", value: "nao", points: 0 },
        { label: "Sim", value: "sim", points: 2 },
      ],
    },
    {
      step: 3,
      question: "Você tem manchas na pele ou febre recente?",
      options: [
        { label: "Não", value: "nao", points: 0 },
        { label: "Sim", value: "sim", points: 2 },
      ],
    },
    {
      step: 4,
      question: "Você está grávida ou tentando engravidar?",
      options: [
        { label: "Não", value: "nao", points: 0 },
        { label: "Sim", value: "sim", points: 3 },
        { label: "Tentando", value: "tentando", points: 3 },
      ],
    },
    {
      step: 5,
      question: "Você nunca fez teste de sífilis?",
      options: [
        { label: "Já fiz teste", value: "nao", points: 0 },
        { label: "Nunca fiz", value: "sim", points: 3 },
      ],
    },
  ];

  const handleAnswer = (value: string, points: number) => {
    const newAnswers = { ...answers, [currentStep]: value };
    setAnswers(newAnswers);

    let newScore = 0;
    Object.entries(newAnswers).forEach(([step, ans]) => {
      const q = questions.find((q) => q.step === parseInt(step));
      const option = q?.options.find((o) => o.value === ans);
      if (option) newScore += option.points;
    });
    setRiskScore(newScore);

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const getRiskLevel = () => {
    if (riskScore >= 7) return { level: "alto", icon: "🚨", title: "Risco Alto Detectado" };
    if (riskScore >= 3) return { level: "moderado", icon: "⚠️", title: "Risco Moderado" };
    return { level: "baixo", icon: "✅", title: "Baixo Risco" };
  };

  const risk = getRiskLevel();
  const progress = ((currentStep - 1) / totalSteps) * 100;

  if (showResult) {
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
            <h1 className="text-xl font-bold">Resultado da Triagem</h1>
          </div>
        </header>

        <div className="flex-1 container py-12 flex items-center justify-center">
          <div className="max-w-2xl w-full">
            <div
              className={`rounded-2xl p-8 text-center ${
                risk.level === "alto"
                  ? "bg-gradient-to-br from-destructive to-[#ee5a5a] text-white"
                  : risk.level === "moderado"
                  ? "bg-gradient-to-br from-warning to-[#FFB74D] text-white"
                  : "bg-gradient-to-br from-success to-[#66BB6A] text-white"
              }`}
            >
              <div className="text-6xl mb-4">{risk.icon}</div>
              <h2 className="text-3xl font-bold mb-4">{risk.title}</h2>

              {risk.level === "alto" && (
                <div className="space-y-4 text-left">
                  <p className="text-lg">
                    Com base nas suas respostas, recomendamos que você procure atendimento médico urgentemente.
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-2">
                    <p className="font-bold">Ação Imediata:</p>
                    <p>Dirija-se à UBS mais próxima hoje mesmo. O tratamento é gratuito e confidencial.</p>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-2">
                    <p className="font-bold">Emergência:</p>
                    <p>Se não puder ir pessoalmente, ligue para 192 (SAMU) ou procure o pronto-socorro.</p>
                  </div>
                </div>
              )}

              {risk.level === "moderado" && (
                <div className="space-y-4 text-left">
                  <p className="text-lg">
                    Você apresenta alguns fatores de risco. Recomendamos fazer o teste de sífilis nas próximas 48 horas.
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-2">
                    <p className="font-bold">Teste Rápido:</p>
                    <p>O teste é gratuito, rápido (resultado em 30 min) e disponível em todas as UBSs.</p>
                  </div>
                </div>
              )}

              {risk.level === "baixo" && (
                <div className="space-y-4 text-left">
                  <p className="text-lg">
                    Pelas suas respostas, seu risco atual parece baixo. Continue com as práticas de prevenção.
                  </p>
                  <div className="bg-white bg-opacity-20 rounded-lg p-4 space-y-2">
                    <p className="font-bold">Prevenção:</p>
                    <p>Use camisinha em todas as relações e faça testes anuais se tiver vida sexual ativa.</p>
                  </div>
                </div>
              )}

              <div className="mt-8 bg-white bg-opacity-20 rounded-lg p-4 text-sm">
                <p className="font-bold mb-2">Aviso importante:</p>
                <p>Esta triagem é apenas uma ferramenta de orientação inicial e não substitui o diagnóstico médico.</p>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                onClick={() => navigate("/mapa")}
                className="flex-1 bg-primary text-white hover:bg-[#14919b]"
              >
                Encontrar UBS
              </Button>
              <Button
                onClick={() => navigate("/")}
                variant="outline"
                className="flex-1"
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions.find((q) => q.step === currentStep);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="container">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate("/")}
              className="text-2xl hover:opacity-80 transition"
            >
              ←
            </button>
            <h1 className="text-xl font-bold">Triagem de Sintomas</h1>
          </div>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div
              className="bg-secondary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 opacity-90">
            Etapa {currentStep} de {totalSteps}
          </p>
        </div>
      </header>

      <div className="flex-1 container py-12 flex items-center justify-center">
        <div className="max-w-2xl w-full">
          {currentQuestion && (
            <div className="bg-card rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-primary mb-8">
                {currentQuestion.question}
              </h2>

              <div className="space-y-3">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value, option.points)}
                    className="w-full p-4 border-2 border-border rounded-lg hover:border-primary hover:bg-primary hover:text-white transition text-left font-medium"
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-4 mt-8">
                <Button
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="flex-1"
                >
                  Anterior
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

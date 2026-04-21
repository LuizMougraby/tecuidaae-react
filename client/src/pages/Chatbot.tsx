import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  source?: string;
}

const knowledgeBase: Record<string, { text: string; source: string }> = {
  "o que é sífilis": {
    text: "A sífilis é uma infecção sexualmente transmissível (IST) causada pela bactéria Treponema pallidum. Pode afetar várias partes do corpo e, se não tratada, pode causar sérios problemas de saúde.",
    source: "Protocolo Clínico MS, 2022 | OMS, 2021",
  },
  sintomas: {
    text: "Primária: Geralmente aparece uma úlcera indolor nos genitais, ânus ou boca. Secundária: Manchas na pele, febre, mal-estar. Latente: Sem sintomas, mas a bactéria permanece.",
    source: "Protocolo Clínico MS, 2022",
  },
  "como se proteger": {
    text: "Use camisinha em todas as relações sexuais. Faça testes regularmente. Converse com parceiros sobre saúde sexual. Procure atendimento imediato em caso de exposição.",
    source: "Boletim Epidemiológico FVS-AM",
  },
  tratamento: {
    text: "O tratamento é feito com penicilina benzatina injetável, gratuitamente no SUS. É simples e eficaz! O tratamento deve ser completado mesmo que os sintomas sumam.",
    source: "Protocolo Clínico MS, 2022",
  },
  "sífilis na gravidez": {
    text: "A sífilis na gravidez pode ser transmitida para o bebê, causando aborto, prematuridade ou malformações. Faça o teste no pré-natal. O tratamento é seguro durante a gravidez.",
    source: "OMS, 2021 | Protocolo MS, 2022",
  },
};

export default function Chatbot() {
  const [, navigate] = useLocation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Olá! Sou o assistente de saúde do TeCuidaAÊ. Posso te ajudar com dúvidas sobre sífilis, prevenção e tratamento.",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const calculateSimilarity = (str1: string, str2: string): number => {
    const words1 = str1.toLowerCase().split(/\s+/);
    const words2 = str2.toLowerCase().split(/\s+/);
    let matches = 0;

    words1.forEach((word) => {
      if (words2.some((w) => w.includes(word) || word.includes(w))) {
        matches++;
      }
    });

    return matches / Math.max(words1.length, words2.length);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const processedText = input.toLowerCase();
      let bestMatch: { text: string; source: string } | null = null;
      let highestScore = 0;

      Object.entries(knowledgeBase).forEach(([key, value]) => {
        const score = calculateSimilarity(processedText, key);
        if (score > highestScore && score > 0.3) {
          highestScore = score;
          bestMatch = value;
        }
      });

      let responseText = bestMatch
        ? (bestMatch as { text: string; source: string }).text
        : "Desculpe, não entendi. Posso te ajudar com: O que é sífilis? Sintomas, Como se proteger, Tratamento, Sífilis na gravidez";

      const botMsg: Message = {
        id: Date.now().toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        source: (bestMatch as { text: string; source: string } | null)?.source,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    "O que é sífilis?",
    "Quais são os sintomas?",
    "Como se proteger?",
    "Qual é o tratamento?",
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#e0f7fa] to-[#b2ebf2]">
      {/* Header */}
      <header className="bg-primary text-white p-4 shadow-lg">
        <div className="container flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="text-2xl hover:opacity-80 transition"
          >
            ←
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary text-xl font-bold">
              🤖
            </div>
            <div>
              <h1 className="text-xl font-bold">Assistente de Saúde</h1>
              <p className="text-sm opacity-90">Disponível 24h</p>
            </div>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 container py-6 overflow-y-auto">
        <div className="space-y-4 max-w-2xl mx-auto">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                  msg.isUser
                    ? "bg-secondary text-primary rounded-br-none"
                    : "bg-white text-foreground rounded-bl-none shadow"
                }`}
              >
                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {msg.text}
                </p>
                {msg.source && (
                  <p className="text-xs opacity-70 mt-2 border-t border-opacity-30 pt-1">
                    Fonte: {msg.source}
                  </p>
                )}
                <p className="text-xs opacity-60 mt-1">
                  {msg.timestamp.toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white text-foreground px-4 py-3 rounded-lg rounded-bl-none shadow">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Replies */}
      {!isTyping && messages.length > 1 && (
        <div className="container py-4 max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-2">Perguntas rápidas:</p>
          <div className="grid grid-cols-2 gap-2">
            {quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInput(reply);
                  setTimeout(() => handleSend(), 100);
                }}
                className="text-xs bg-white text-primary border border-primary rounded-lg px-3 py-2 hover:bg-primary hover:text-white transition"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t border-border p-4">
        <div className="container max-w-2xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite sua pergunta..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="bg-primary text-white hover:bg-[#14919b]"
            >
              Enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

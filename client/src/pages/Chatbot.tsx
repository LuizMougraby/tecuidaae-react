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
      text: "Olá, sou o assistente virtual. Como osso te ajudar?",
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
    "Sintomas",
    "Prevenção",
    "Tratamento?",
    "Gravidez"
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#1a315b"}}>
      {/* Header */}
      <header className="bg-[#6ADE8A] p-6 shadow-lg relative">
  <div className="container max-w-4xl mx-auto">
    <div className="flex items-center">
      <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-80 transition absolute left-6">
        ←
      </button>
      <div className="flex-1 text-center">
        <h1 className="text-2xl font-bold text-white">ChatBot</h1>
        <p className="text-base text-white opacity-90">Seu assistente virtual está aqui! Pergunte, e ele irá tirar suas dúvidas!</p>
      </div>
    </div>
  </div>
</header>

      {/* Messages Container */}
      <div className="flex-1 w-full py-6 overflow-y-auto px-8">
  <div className="rounded-3xl p-6 max-w-4xl mx-auto space-y-6" style={{ backgroundColor: "rgba(255,255,255,0.80)" }}>
    {messages.map((msg) => (
      <div
        key={msg.id}
        className={`flex items-end gap-3 ${msg.isUser ? "justify-end" : "justify-start"}`}
      >
        {/* Bolinha do bot */}
        {!msg.isUser && (
          <div className="w-10 h-10 rounded-full bg-[#6ADE8A] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            
          </div>
        )}

        <div
          className={`max-w-lg px-5 py-4 rounded-2xl shadow ${
            msg.isUser
              ? "bg-[#0059FF] text-white rounded-br-none"
              : "bg-[#6ADE8A] text-white rounded-bl-none"
          }`}
        >
          <p className="whitespace-pre-wrap text-base leading-relaxed">
            {msg.text}
          </p>
          {msg.source && (
            <p className="text-xs opacity-70 mt-2 border-t border-opacity-30 pt-1">
              Fonte: {msg.source}
            </p>
          )}
          <p className="text-xs opacity-60 mt-2">
            {msg.timestamp.toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        {/* Bolinha do usuário */}
        {msg.isUser && (
          <div className="w-10 h-10 rounded-full bg-[#0059FF] flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
            
          </div>
        )}
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

      {/* Botões rápidos — sempre visíveis */}
      <div className="w-full px-8 py-4 border-b border-gray-200 bg-white">
        <div className="flex flex-wrap gap-3">
          {quickReplies.map((reply, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInput(reply);
                setTimeout(() => handleSend(), 100);
              }}
              className="px-5 py-2 rounded-full border-2 border-[#6ADE8A] text-[#6ADE8A] font-semibold text-sm hover:bg-[#6ADE8A] hover:text-white transition"
            >
              {reply}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="w-full max-w-4xl mx-auto">
          <div className="flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Digite/marque para conversar com o assistente virtual..."
              disabled={isTyping}
              className="flex-1 px-6 py-4 rounded-full border-2 border-gray-200 focus:border-[#6ADE8A] focus:outline-none text-gray-700 text-base"
            />
            <button
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              className="w-14 h-14 rounded-full bg-[#6ADE8A] text-white flex items-center justify-center hover:opacity-90 transition disabled:opacity-40 disabled:cursor-not-allowed text-2xl"
            >
              ➤
            </button>
          </div>
        </div>
      </div>
      </div>
  );
}

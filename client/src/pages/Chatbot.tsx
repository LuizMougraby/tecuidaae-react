import { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMemo } from "react";
import { useChatbotDB } from "@/hooks/useChatbotDB";
import imgChatbot from "@/assets/Encontre UBSs.jpg";
import Groq from "groq-sdk";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  source?: string;
}

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});
const knowledgeBase: Record<string, { text: string; source: string }> = {
  "o que é sífilis": {
    text: "A sífilis é uma infecção sexualmente transmissível (IST) causada pela bactéria Treponema pallidum. Pode afetar várias partes do corpo e, se não tratada, pode causar sérios problemas de saúde.",
    source: "Protocolo Clínico MS, 2022 | OMS, 2021",
  },
  sintomas: {
    text: "Primária: Geralmente aparece uma úlcera indolor nos genitais, ânus ou boca. Secundária: Manchas na pele, febre, mal-estar. Latente: Sem sintomas, mas a bactéria permanece.",
    source: "Protocolo Clínico MS, 2022",
  },
  "Prevenção": {
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
      text: "Olá, sou o assistente virtual. Como posso te ajudar?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sessionId = useMemo(() => crypto.randomUUID(), []);
  const { salvarMensagem } = useChatbotDB(sessionId);

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

  const handleSend = async () => {
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

    const processedText = input.toLowerCase();

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `Você é um assistente virtual de saúde pública especializado em sífilis.
            Responda APENAS o que foi perguntado, de forma direta e objetiva.
            Não adicione informações extras além do que foi perguntado.
            Responda em português brasileiro, de forma clara e acolhedora.
            Reconhença e entenda gírias e expressões regionais do Amazonas como "mano", "égua", "oexnte", "rapaz" e similares.
            Use no máximo 5 linhas na resposta.
            Base suas respostas nos protocolos do Ministério da Saúde e OMS.
            Sempre termine sua resposta com uma linha assim: (Fonte: Ministério da Saúde e OMS).
            Não use markdown como ** ou * na resposta, use texto simples.`
          },
          { role: "user", content: input }
        ],
        model: "llama-3.3-70b-versatile",
        max_tokens: 200,
      });

      const responseText = completion.choices[0]?.message?.content || "Não consegui gerar uma resposta.";

      const botMsg: Message = {
        id: Date.now().toString(),
        text: responseText,
        isUser: false,
        timestamp: new Date(),
        source: "Fonte: Ministério da Saúde e OMS",
      };

      setMessages(prev => [...prev, botMsg]);
      salvarMensagem(userMsg.text, responseText);
   } catch (error) {
      console.error("Erro Gemini:", error);
      const botMsg: Message = {
        id: Date.now().toString(),
        text: "Desculpe, ocorreu um erro. Tente novamente em instantes.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMsg]);
    }
    setIsTyping(false);
  };

  const quickReplies = [
    "Sintomas",
    "Prevenção",
    "Tratamento",
    "Gravidez"
  ];

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundImage: `url(${imgChatbot})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      {/* Header */}
      <header className="bg-[#6ADE8A] p-4 sm:p-6 shadow-lg relative">
  <div className="container max-w-4xl mx-auto">
    <div className="flex items-center">
      <button onClick={() => navigate("/")} className="text-2xl text-white hover:opacity-80 transition absolute left-4 sm:left-6 min-w-[48px] min-h-[48px] intems-center justify-center">
        ←
      </button>
      <div className="flex-1 text-center px-12">
        <h1 className="text-xl sm:tet-2xl font-bold text-white">ChatBot</h1>
        <p className="text-sm sm:text-xl text-white opacity-90">Seu assistente virtual está aqui! Pergunte, e ele irá tirar suas dúvidas!</p>
      </div>
    </div>
  </div>
</header>

      {/* Messages Container */}
      <div className="flex-1 w-full py-4 sm:p-6 overflow-y-auto px-2 sm:px-8">
  <div className="rounded-3xl p-4 sm:p-8 w-full max-w-5xl mx-auto space-y-4 sm:space-y-6 min-h-[600px] flex flex-col justify-between border-2 border-[#6ADE8A]" style={{ backgroundColor: "rgba(255,255,255,0.70)" }}>
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
  className={`px-4 py-3 sm:px-5 sm:py-4 rounded-2xl shadow ${
    msg.isUser
      ? "bg-white text-black rounded-br-none max-w-[75vw] sm:max-w-xl border-2 border-[#0059FF]"
      : "bg-white text-black rounded-bl-none max-w-[75vw] sm:max-w-lg border-2 border-[#6ADE8A]"
  }`}
>
  {quickReplies.includes(msg.text) && msg.isUser ? (
    <span className="px-3 py-1 sm:px-4 sm:py-2 rounded-full bg-[#0059FF] text-white text-base sm:text-lg font-semibold inline-block">
      {msg.text}
    </span>
  ) : (
    <p className="whitespace-pre-wrap text-base sm:text-lg leading-relaxed">
      {msg.text}
    </p>
  )}
          {/* Botões de opção dentro do balão do bot */}
          {!msg.isUser && (
            <div className="grid grid-cols-2 gap-2 mt-3">
              {quickReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(reply);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-4 py-2 rounded-full bg-[#6ADE8A] text-white text-base font-semibold border-2 border-[#6ADE8A] hover:bg-opacity-90 transition min-h-[48px]"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}
          {msg.source && (
            <p className="text-xs opacity-70 mt-2 border-t border-opacity-30 pt-1">
              Fonte: {msg.source}
            </p>
          )}
          <p className="text-xs mt-2 opacity-60 text-black text-right">
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

          {/* Input Area — dentro do card */}
          <div className="flex gap-2 sm:gap-3 items-center mt-4 pt-4 border-t border-gray-200">
  <input
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyPress={(e) => e.key === "Enter" && handleSend()}
    placeholder="Digite sua dúvida..."
    disabled={isTyping}
    className="flex-1 px-4 py-3 sm:px-6 sm:py-4 rounded-full border-2 border-gray-200 focus:border-[#6ADE8A] focus:outline-none text-gray-700 text-sm sm:text-base placeholder-[#0059FF]"
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
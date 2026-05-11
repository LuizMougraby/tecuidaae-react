import { useCallback } from "react";

export function useChatbotDB(sessionId: string) {
  const salvarMensagem = useCallback(
    async (pergunta: string, resposta: string) => {
      try {
        const response = await fetch("/api/chatbot/mensagem", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId, pergunta, resposta }),
        });

        if (!response.ok) {
          const data = await response.json();
          console.error("useChatbotDB:", data.error);
        }
      } catch (err) {
        console.error("useChatbotDB: erro de rede:", err);
      }
    },
    [sessionId]
  );

  return { salvarMensagem };
}
import { useState } from "react";

interface SalvarResultadoArgs {
  respostas: Record<number, string>;
  riscoScore: number;
  riscoNivel: "baixo" | "moderado" | "alto";
}

export function useTriagemDB() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const salvarResultado = async ({
    respostas,
    riscoScore,
    riscoNivel,
  }: SalvarResultadoArgs) => {
    setLoading(true);
    setError(null);

    const sessionId = crypto.randomUUID();

    try {
      const response = await fetch("/api/triagem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, respostas, riscoScore, riscoNivel }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error ?? "Erro ao salvar resultado.");
      }

      return await response.json();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erro desconhecido.";
      setError(msg);
      console.error("useTriagemDB:", msg);
    } finally {
      setLoading(false);
    }
  };

  return { salvarResultado, loading, error };
}
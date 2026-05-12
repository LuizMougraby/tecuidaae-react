import type { VercelRequest, VercelResponse } from "@vercel/node";
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const path = req.url?.replace("/api", "") ?? "";

  // POST /api/triagem
  if (req.method === "POST" && path === "/triagem") {
    const { sessionId, respostas, riscoScore, riscoNivel } = req.body;

    if (!sessionId || !respostas || riscoScore === undefined || !riscoNivel) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const [result] = await sql`
      INSERT INTO triagem_resultados (session_id, respostas, risco_score, risco_nivel)
      VALUES (${sessionId}, ${JSON.stringify(respostas)}, ${riscoScore}, ${riscoNivel})
      RETURNING id, created_at
    `;

    return res.status(201).json({ id: result.id, createdAt: result.created_at });
  }

  // GET /api/triagem/stats
  if (req.method === "GET" && path === "/triagem/stats") {
    const stats = await sql`
      SELECT risco_nivel, COUNT(*)::int AS total
      FROM triagem_resultados
      GROUP BY risco_nivel
    `;
    return res.json(stats);
  }

  // POST /api/chatbot/mensagem
  if (req.method === "POST" && path === "/chatbot/mensagem") {
    const { sessionId, pergunta, resposta } = req.body;

    if (!sessionId || !pergunta || !resposta) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    const [result] = await sql`
      INSERT INTO chatbot_mensagens (session_id, pergunta, resposta)
      VALUES (${sessionId}, ${pergunta}, ${resposta})
      RETURNING id, created_at
    `;

    return res.status(201).json({ id: result.id, createdAt: result.created_at });
  }

  return res.status(404).json({ error: "Rota não encontrada." });
}
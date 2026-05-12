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
// GET /api/admin/triagem-stats
  if (req.method === "GET" && path === "/admin/triagem-stats") {
    const stats = await sql`
      SELECT risco_nivel, COUNT(*)::int AS total
      FROM triagem_resultados
      GROUP BY risco_nivel
      ORDER BY total DESC
    `;
    return res.json(stats);
  }

  // GET /api/admin/chatbot-stats
  if (req.method === "GET" && path === "/admin/chatbot-stats") {
    const stats = await sql`
      SELECT pergunta, COUNT(*)::int AS total
      FROM chatbot_mensagens
      GROUP BY pergunta
      ORDER BY total DESC
      LIMIT 10
    `;
    return res.json(stats);
  }

  // GET /api/admin/daily-stats
  if (req.method === "GET" && path === "/admin/daily-stats") {
    const stats = await sql`
      SELECT 
        TO_CHAR(created_at::date, 'DD/MM') AS data,
        COUNT(*)::int AS total
      FROM triagem_resultados
      WHERE created_at >= NOW() - INTERVAL '7 days'
      GROUP BY created_at::date
      ORDER BY created_at::date ASC
    `;
    return res.json(stats);
  }
  return res.status(404).json({ error: "Rota não encontrada." });
}
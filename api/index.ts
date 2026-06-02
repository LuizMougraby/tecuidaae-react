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

// POST /api/chatbot/groq
  if (req.method === "POST" && path === "/chatbot/groq") {
    const { pergunta } = req.body;

    if (!pergunta) {
      return res.status(400).json({ error: "Pergunta ausente." });
    }

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 200,
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
          { role: "user", content: pergunta }
        ]
      })
    });

    const data = await response.json();
    const texto = data.choices[0]?.message?.content || "Não consegui gerar uma resposta.";
    return res.status(200).json({ resposta: texto });
  }

  return res.status(404).json({ error: "Rota não encontrada." });
}
import { Router } from "express";
import { sql } from "./db.js";

export const router = Router();

// ─────────────────────────────────────────────
// TRIAGEM
// ─────────────────────────────────────────────

router.post("/triagem", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Erro ao salvar triagem:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.get("/triagem/stats", async (_req, res) => {
  try {
    const stats = await sql`
      SELECT
        risco_nivel,
        COUNT(*)::int AS total
      FROM triagem_resultados
      GROUP BY risco_nivel
    `;
    return res.json(stats);
  } catch (err) {
    console.error("Erro ao buscar stats de triagem:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// ─────────────────────────────────────────────
// CHATBOT
// ─────────────────────────────────────────────

router.post("/chatbot/mensagem", async (req, res) => {
  try {
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
  } catch (err) {
    console.error("Erro ao salvar mensagem do chatbot:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

// ─────────────────────────────────────────────
// UBS AVALIAÇÕES
// ─────────────────────────────────────────────

router.post("/ubs/avaliacao", async (req, res) => {
  try {
    const { ubsId, ubsNome, nota, comentario } = req.body;

    if (!ubsId || !ubsNome || nota === undefined) {
      return res.status(400).json({ error: "Campos obrigatórios ausentes." });
    }

    if (nota < 1 || nota > 5) {
      return res.status(400).json({ error: "Nota deve ser entre 1 e 5." });
    }

    const [result] = await sql`
      INSERT INTO ubs_avaliacoes (ubs_id, ubs_nome, nota, comentario)
      VALUES (${ubsId}, ${ubsNome}, ${nota}, ${comentario ?? null})
      RETURNING id, created_at
    `;

    return res.status(201).json({ id: result.id, createdAt: result.created_at });
  } catch (err) {
    console.error("Erro ao salvar avaliação de UBS:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});

router.get("/ubs/:id/avaliacao", async (req, res) => {
  try {
    const ubsId = Number(req.params.id);

    if (isNaN(ubsId)) {
      return res.status(400).json({ error: "ID de UBS inválido." });
    }

    const [stats] = await sql`
      SELECT
        COUNT(*)::int   AS total_avaliacoes,
        ROUND(AVG(nota)::numeric, 1) AS media_nota
      FROM ubs_avaliacoes
      WHERE ubs_id = ${ubsId}
    `;

    return res.json(stats);
  } catch (err) {
    console.error("Erro ao buscar avaliações da UBS:", err);
    return res.status(500).json({ error: "Erro interno do servidor." });
  }
});
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL não definida. Verifique o arquivo .env");
}

export const sql = neon(process.env.DATABASE_URL);

/**
 * Inicializa o banco de dados criando as tabelas necessárias.
 * Chamado uma vez na inicialização do servidor.
 */
export async function initializeDatabase() {
  await sql`
    CREATE TABLE IF NOT EXISTS triagem_resultados (
      id          SERIAL PRIMARY KEY,
      session_id  TEXT        NOT NULL,
      respostas   JSONB       NOT NULL,
      risco_score INTEGER     NOT NULL,
      risco_nivel TEXT        NOT NULL CHECK (risco_nivel IN ('baixo', 'moderado', 'alto')),
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS chatbot_mensagens (
      id          SERIAL PRIMARY KEY,
      session_id  TEXT        NOT NULL,
      pergunta    TEXT        NOT NULL,
      resposta    TEXT        NOT NULL,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS ubs_avaliacoes (
      id          SERIAL PRIMARY KEY,
      ubs_id      INTEGER     NOT NULL,
      ubs_nome    TEXT        NOT NULL,
      nota        INTEGER     NOT NULL CHECK (nota BETWEEN 1 AND 5),
      comentario  TEXT,
      created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  console.log("✅ Banco de dados inicializado com sucesso.");
}
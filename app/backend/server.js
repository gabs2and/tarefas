require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

const app = require("express")();

// Exemplo de uma rota para testar a conexão com o banco
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Conectado ao PostgreSQL!", time: result.rows[0] });
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
    res.status(500).json({ error: "Erro ao conectar ao banco" });
  }
});

// Iniciar servidor na porta configurada
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});

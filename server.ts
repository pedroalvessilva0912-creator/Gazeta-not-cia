import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-load email transporter
let transporter: nodemailer.Transporter | null = null;
function getTransporter() {
  if (!transporter) {
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.warn("SMTP_HOST, SMTP_USER, or SMTP_PASS not set. Email functionality will be mocked.");
      return null;
    }
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

// API Routes
app.post("/api/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "E-mail inválido." });
  }

  try {
    const mailer = getTransporter();
    
    if (mailer) {
      await mailer.sendMail({
        from: `"Gazeta Notícia" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
        to: email,
        subject: "Bem-vindo(a) à Newsletter da Gazeta Notícia",
        text: "Obrigado por se inscrever na nossa newsletter! Você receberá as principais notícias em breve.",
        html: `
          <div style="font-family: sans-serif; color: #121212;">
            <h2 style="color: #ff4500;">Inscrição Confirmada!</h2>
            <p>Olá,</p>
            <p>Sua inscrição na nossa newsletter foi confirmada com sucesso.</p>
            <p>Em breve, enviaremos as principais análises e notícias diretamente para a sua caixa de entrada.</p>
            <p>Atenciosamente,<br>Equipe Gazeta Notícia</p>
          </div>
        `
      });
      console.log(`Email enviado para ${email}`);
    } else {
      console.log(`[MOCK] Email de confirmação enviado para ${email}`);
    }
    
    res.json({ success: true, message: "E-mail de confirmação enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    res.status(500).json({ error: "Ocorreu um erro ao processar sua inscrição. Tente novamente mais tarde." });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

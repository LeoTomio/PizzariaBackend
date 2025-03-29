import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import fileUpload from "express-fileupload";
import { createServer } from "http"; // Importando o módulo HTTP
import { router } from "./routes";
import { Server } from "socket.io";
import { initializeSocket} from "./websockets/socketHandlers";

const app = express();

const server = createServer(app);

app.use(express.json());
app.use(cors());
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 }, // max 50 MB
  })
);

initializeSocket(server);

// Rotas
app.use(router);

// Middleware de tratamento de erros
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ status: "error", message: "Internal server error." });
});

// Iniciar o servidor na porta especificada
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

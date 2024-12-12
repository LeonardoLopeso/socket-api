import express, {  Request, Response} from "express";
import { Server } from "socket.io";
import { createServer } from 'http'
import { data } from "./data";

const app = express();
const server = createServer(app);

app.use(express.json())

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST"]
  }
})

io.on("connection", (socket) => {
  console.log(`Novo cliente conectado: ${socket.id}`);

  let index = 0;

  const interval = setInterval(() => {
    if (index < data.length) {
      const item = data[index]; // Envia apenas o item atual
      socket.emit("records", JSON.stringify(item)); // Emite para o cliente específico
      index++;
    } else {
      clearInterval(interval); // Para o intervalo ao final da lista
    }
  }, 3000);

  socket.on("disconnect", () => {
    console.log(`Cliente desconectado: ${socket.id}`);
    clearInterval(interval); // Para o intervalo ao desconectar
  });
});

app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    message: 'API is running'
  })
})

// Endpoint para cadastrar um usuário
app.post('/register', (req: Request, res: Response) => {
  const newUser = req.body

  data.push(newUser)

  io.emit("records", JSON.stringify(newUser))

  res.status(201).json({ 
    message: 'Registro criado com sucesso!',
    data: newUser
   })
})

server.listen(4000, () => {
  console.log("Server is running on port 4000")
})
import express from "express";
//importar rutas de sabores
import pedidosRoutes from "./components/pedido/pedido.routes";
//importar rutas de autenticacion
import authRoutes from "./components/auth/auth.routes";
//conectar middleware
import { logger } from "./middlewares/logger.middleware";

const app = express();

app.use(express.json());
app.use(logger);

app.get("/", (req, res) => {
  res.send("API Heladería funcionando");
});


app.use("/pedidos", pedidosRoutes);
app.use("/auth", authRoutes);



export default app;



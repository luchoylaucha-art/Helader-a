import express from "express";
//importar rutas de sabores
import saboresRoutes from "./routes/sabor.routes";
//importar rutas de presentaciones
import presentacionesRoutes from "./routes/presentacion.routes";
//importar rutas de pedidos
import pedidosRoutes from "./components/pedido/pedido.routes";
//importar rutas de autenticacion
import authRoutes from "./components/auth/auth.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Heladería funcionando");
});

app.use("/sabores", saboresRoutes);
app.use("/presentaciones", presentacionesRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/auth", authRoutes);



export default app;



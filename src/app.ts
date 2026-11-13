import express from "express";
//importar rutas de sabores
import saboresRoutes from "./routes/sabor.routes";
//importar rutas de presentaciones
import presentacionesRoutes from "./routes/presentacion.routes";
//importar rutas de usuarios
import userRoutes from "./routes/user.routes";
//importar rutas de pedidos
import pedidosRoutes from "./routes/pedido.routes";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Heladería funcionando");
});

app.use("/sabores", saboresRoutes);
app.use("/presentaciones", presentacionesRoutes);
app.use("/usuarios", userRoutes);
app.use("./pedidos", pedidosRoutes);



export default app;



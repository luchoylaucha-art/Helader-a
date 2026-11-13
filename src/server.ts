//conectDB();
import "dotenv/config";
import dns from "node:dns";
import app from "./app";
import { connectDB } from "./config/database";

if (process.env.DNS_SERVERS){
    dns.setServers(process.env.DNS_SERVERS.split(","));
}

const PORT = process.env.PORT || 3000;

const iniciarServidor = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Servidor ejecutándose en puerto ${PORT}`);
        });
    } catch (error) {
        console.error("No se pudo iniciar el servidor:", error);
        process.exit(1);
    }
};
iniciarServidor();


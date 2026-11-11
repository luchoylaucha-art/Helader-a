import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        await mongoose.connect(
            "mongodb+srv://USUARIO:PASSWORD@CLUSTER.mongodb.net/heladeria"
        );

        console.log("MongoDB conectado");

    } catch (error) {

        console.error(
            "Error al conectar a MongoDB",
            error
        );

    }
};
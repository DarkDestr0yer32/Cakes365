import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://Cakes365Admin:Preeticakes365@cluster0.egahjv9.mongodb.net/Cakes365')
        .then(() => console.log("DB Connected"))
}
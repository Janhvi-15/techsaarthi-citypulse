import mongoose from "mongoose"

const connectDB = async () =>{
    try {
        const connectInstance = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("Something went wrong connecting the database",error);
        
    }
}

export default connectDB
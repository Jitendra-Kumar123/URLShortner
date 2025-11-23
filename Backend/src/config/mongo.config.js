import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // fail faster if mongo is unreachable
            serverSelectionTimeoutMS: 5000,
            connectTimeoutMS: 10000,
        });
        console.log(`connected to MongoDB: ${conn.connection.host}`);
    } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
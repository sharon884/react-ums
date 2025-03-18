const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies in requests
})
);//intrace with frontend and backend
app.use(express.json());//formata data to json 
app.use(cookieParser());
app.use("/uploads", express.static("uploads")); // Serve uploaded files as static

app.get("/", (req, res) => {
    res.send("Server is running...");
  });
  
const PORT = process.env.PORT||5001
const Mongo_URI = process.env.Mongo_URI|| "mongodb://localhost:27017/user";


mongoose.connect(Mongo_URI)
.then(()=>console.log("mongo db connected suceesfully!"))
.catch((err)=>console.log("mongo db connecting failed!"));


app.use("/api/users" ,userRoutes);
app.use("/api/admin" ,adminRoutes)

app.listen( PORT , () => console.log(`server is running on http://localhost:${PORT}`) )
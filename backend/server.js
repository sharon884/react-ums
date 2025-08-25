const dotenv = require("dotenv")
dotenv.config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/adminRoutes");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));

const allowedOrigins = [
  "http://localhost:5173",                       // Local development
  "https://builtbysharon.site",                  // Main frontend
  "https://app.builtbysharon.site",             // Custom frontend domain
  "https://react-ums-theta.vercel.app",         // Vercel preview domain 1
  "https://react-ums-sharons-projects-b294a284.vercel.app" // Vercel preview domain 2
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow cookies/credentials
  })
);
app.use(express.json());//formata data to json 
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve uploaded files as static

app.get("/", (req, res) => {
    res.send("Server is running...");
  });
  
const PORT = process.env.PORT||5006
const Mongo_URI = process.env.Mongo_URI;
console.log(Mongo_URI)

mongoose.connect(Mongo_URI)

.then(()=>console.log("mongo db connected suceesfully!"))
.catch((err)=>console.log("mongo db connecting failed!"));


app.use("/api/users" ,userRoutes);
app.use("/api/admin" ,adminRoutes)

app.listen( PORT , () => console.log(`server is running on http://localhost:${PORT}`) )
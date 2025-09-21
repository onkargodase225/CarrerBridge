
// package.json mai type module karne se ham abhi require ki jagah import use kar sakte hai

import express from "express";
import cookieParser from 'cookie-parser' // agar isko use naahi kiya to frontend side se jo bhi request hoga token ayega lekin parse nahi hoga
import cors from "cors"
import dotenv from "dotenv";
import connectDB from "./utils/db.js"; // import method mai .js bhi likhna padega
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js"

dotenv.config()

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
 

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
app.use(cors(corsOptions));

const PORT=process.env.PORT || 3000; // dono maise ek konsa bhi port no

//api's
app.use("/api/v1/user",userRoute);
// kuch is prakar se banega register ,login ,profile request ke liye apis
//// "http://localhost:8000/api/v1/user/register";
//// "http://localhost:8000/api/v1/user/login";
//// "http://localhost:8000/api/v1/user/profile";

app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

connectDB();


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`);
})
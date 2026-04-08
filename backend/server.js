const express = require("express");
const mongoose=require("mongoose");
require("dotenv").config()
const authroutes=require("./routes/authRoute")
const healthRoutes=require("./routes/healthRoute")
const cookieParser=require("cookie-parser")
const cors=require("cors")

const app = express();

app.use(cors({
  origin: "https://diabetes-predictor-app-dusky.vercel.app",
  credentials: true
}));
app.use(cors());


app.use(express.json());
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB connected"))
.catch((err)=>console.log(err))

app.get("/", (req, res) => {
    res.send("Backend running");
});

app.use("/auth",authroutes)
app.use("/health",healthRoutes)

app.listen(3000, () => {
    console.log("Server running on port 3000");
})

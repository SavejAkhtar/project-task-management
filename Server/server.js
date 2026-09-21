const mongoose=require("mongoose");
const express=require("express");
const cors=require("cors");
const { userRouter } = require("./routes/userRoutes");
const { projectRouter } = require("./routes/projectRoutes");
const taskRouter = require("./routes/taskRoutes");


 
require("dotenv").config();

const app=express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("Project Management API is running");
});

app.use("/api/users", userRouter);

app.use("/api/projects", projectRouter);

app.use("/api/tasks", taskRouter);

mongoose.connect(process.env.URL).then(()=>{
    console.log("DB Connected")
    app.listen(process.env.PORT,()=>{
        console.log("Running on Port ", process.env.PORT)
    })
})
.catch((err)=>{
    console.log(err)
});
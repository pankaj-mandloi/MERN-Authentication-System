
import express from "express";
const app = express();
import cors from "cors";
import  {connectToDatabase }  from "./database/db_Connection.js";
import router from "./routes/mongodbtasks.route.js";
import authRouter from "./routes/mongodbauths.route.js";
const PORT = 5555;

app.use(cors());
app.use(express.json());



connectToDatabase();




app.use('/mongodbtasks',router);
app.use('/mongodbauths',authRouter);



app.get('/',(req,res)=>{
      res.send("Backend is running ")
})

app.listen((PORT),function(){
    console.log("Server is Running on the PORT :"+PORT);
})




   
















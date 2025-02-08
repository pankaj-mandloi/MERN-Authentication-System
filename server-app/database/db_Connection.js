
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const username = process.env.myusername;
const password = process.env.mypassword;

if (!username || !password) {
  throw new Error("Missing MongoDB Credentials");
}


export const connectToDatabase = async () => {


  const connectionString = `mongodb+srv://${username}:${password}@cluster0.s7b1i.mongodb.net/taskDatabase?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(connectionString,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DataBase Connect successfully to MongoDB Atlas ");

  } catch (error) {
    console.log("Error please check  database connection !!")
  }


}





// mongodb+srv://pankaj:<db_password>@cluster0.s7b1i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

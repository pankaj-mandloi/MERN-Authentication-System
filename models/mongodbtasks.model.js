import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({

    title : String,
    description: String,
    assigningDate: String,
    photo: String,
    status: {
        type: String, 
    },
    

      
}) 

export const MongoDBTasks= mongoose.models.mongodbtasks || mongoose.model('mongodbtasks',taskSchema);




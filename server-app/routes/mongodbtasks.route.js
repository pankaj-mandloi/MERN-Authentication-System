
import express from "express";
import { MongoDBTasks } from "../models/mongodbtasks.model.js";
import multer from "multer";



const router = express.Router();


//image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/Users/HP/Desktop/Next Js/MongoDbTask/server-app/imagefolder')

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);

    }
})
const upload = multer({
    storage: storage
})


router.post("/send", upload.single('file'), async (req, res) => {

    const { title, description, assigningDate,photo } = await req.body;

    try {

        const taskData = new MongoDBTasks({ title, description, assigningDate, photo });
        const response = await taskData.save();

        // console.log("Send methor response",response);
        res.status(200).json({
            success: true,
            message: "Task Succesfully added",

        });


    } catch (error) {
        res.status(404).json({
            message: "Error inpost api",
            success: false
        })
    }


})



router.post("/uploadimage", upload.single('file'), async (req, res) => {

    res.status(200).json({
        filename: req.file.filename,
        message: "Image uploaded",
        success: true,
        
    })
    console.log("File name", req.file.filename)
    console.log("Post methord Api work for imageupload");

})




router.use('/images',express.static('C:/Users/HP/Desktop/Next Js/MongoDbTask/server-app/imagefolder'));





router.get("/retrive", async (req, res) => {

    const taskData = await MongoDBTasks.find();
    // console.log("task data",taskData)

    res.status(200).json({
        result: taskData,
        success: true,
        message: "Tasks successfully retrieved!"
    })
    console.log("Get methord Api work")

})

//Delete Method 
router.delete("/deleteTask/:id",async(req,res)=>{
    

     const {id} = req.params;
     console.log("Delete Api Backend ",id);
     
    const deleteTask = await MongoDBTasks.findByIdAndDelete(id); 

   res.json({message:"Data Deleted Succesfully",success:true});


})

router.put("/updateStatus/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    console.log("Received status", status);  // Log the received status
    console.log("Update Status for ID:", id);  // Log the task ID

    try {
    
        const updatedTask = await MongoDBTasks.findByIdAndUpdate(id, { status });
        console.log("Updated Task:", updatedTask);  // Log the updated task

        // Respond with the updated task
        res.json({
            success: true,
            message: "Task updated successfully",
            result: updatedTask,  
        });
    } catch (error) {
        console.error("Error updating task:", error);  
        res.status(500).json({ success: false, message: "Error updating task" });
    }
});


export default router;




import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ProgressBar from "@ramonak/react-progress-bar";
export default function ShowData() {

    const [taskData, setTaskData] = useState([]);
    // const[status,setStatus]=useState("");



    useEffect(() => {

        const fetchAllTaskData = async () => {

            try {
                const response = await fetch('http://localhost:5555/mongodbtasks/retrive');
                const data = await response.json();

                // console.log("Fetch api frontend",data);
                console.log("Fetch api frontend", data.result);

                if (data.success) {
                    setTaskData(data.result);

                } else {
                    alert("Error occur");
                }


            } catch (error) {
                alert("Error occur for fetching all task data !!");

            }


        }


        fetchAllTaskData();

    }, [])

    const fetchColor = () => {

        const colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33F3'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const handleDeleteTask = async (id) => {
        console.log("Delete button clicked with ID:", id);

        try {
            const response = await fetch(`http://localhost:5555/mongodbtasks/deleteTask/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();
            console.log("Delete Method API Response:", data);

            if (data.success) {
                alert("Task deleted successfully!");
                setTaskData(prevTasks => prevTasks.filter(task => task._id !== id));
            } else {
                alert("Failed to delete task: " + data.message);
            }
        } catch (error) {
            console.error("Delete API error:", error);
            alert("Failed to delete task. Please try again.");
        }
    };

    const handleTaskStatusUpdate = async (id, newStatus) => {
        console.log("debug", id, newStatus)
        try {
            const response = await fetch(`http://localhost:5555/mongodbtasks/updateStatus/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: newStatus }),
            });

            const data = await response.json();
            console.log("Update api frontend", data);
            if (data.success) {
                alert("Task Status Updated");
                setTaskData(prevTasks =>
                    prevTasks.map(task =>
                        task._id === id ? { ...task, status: newStatus } : task
                    )
                );
            }


        } catch (error) {
            alert("Status Api does not work !!")
        }
    }

    return (
        <>
            <div>
                <div style={{ marginTop: "30px" }}>
                    <Link to="/addData" style={{
                        backgroundColor: "blue", color: "white",
                        border: "none", borderRadius: "10px",
                        fontSize: "14px", padding: "8px ",
                        marginTop: "10px", marginLeft: "20px",
                        textDecoration: 'none'
                    }}>Go Back </Link>

                    <h3 style={{ textAlign: "center", marginTop: "-35px", textShadow: "8px 6px 8px rgba(244, 6, 22, 0.3)" }}>Show Task Details !!</h3>
                    <div>
                        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "40px" }} border={2} >
                            <thead style={{ backgroundColor: "#4CAF50", color: "white", textAlign: "center" }}>
                                <tr >
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Assigning Data</th>
                                    <th>Task Image</th>
                                    <th>Progress Bar</th>
                                    <th>Action</th>
                                    <th>Status</th>

                                </tr>
                            </thead>
                            <tbody style={{ fontSize: "15px", textAlign: "center" }}>

                                {
                                    taskData.map((item, index) => (
                                        <tr key={index} style={{
                                            backgroundColor: index % 2 === 0 ? "#f2f2f2" : "white", // Zebra striping effect
                                            borderBottom: "1px solid #ddd", // Subtle border for each row
                                        }} >
                                            <td style={{ padding: "8px" }}>{item._id}</td>
                                            <td style={{ padding: "8px " }}>{item.title}</td>
                                            <td style={{ padding: "8px  " }}>{item.description}</td>
                                            <td style={{ padding: "8px " }}>{new Date(item.assigningDate).toLocaleDateString()}</td>

                                            <td style={{ padding: "8px 12px" }} >
                                                <img src={`http://localhost:5555/mongodbtasks/images/${item.photo}`} alt="Task Image" style={{ width: "140px", height: "140px" }}></img>
                                            </td>
                                            <td  >
                                                <ProgressBar completed={80}
                                                    bgColor={fetchColor()}
                                                    labelColor="#000" />
                                            </td>
                                            <td style={{ padding: "8px 20px" }}>
                                                {/* console.log("Id by serial number",{item._id}); */}
                                                <button type="submit" onClick={() => handleDeleteTask(item._id)}
                                                    style={{ backgroundColor: "red", border: "none", color: "white", borderRadius: "8px", fontSize: "16px" }}
                                                >Delete</button>

                                            </td>
                                            <td style={{ padding: "8px 20px" }}>
                                                <button
                                                    style={{ backgroundColor: "", color: "", borderRadius: "8px" }}
                                                    disabled={item.status === 'Complete'}
                                                    onClick={() => handleTaskStatusUpdate(item._id, 'Pending')}
                                                >
                                                    Pending
                                                </button>
                                                <hr />
                                                <button
                                                    style={{ backgroundColor: "", color: "", borderRadius: "8px" }}
                                                    disabled={item.status === 'Pending'}
                                                    onClick={() => handleTaskStatusUpdate(item._id, 'Complete')}
                                                >
                                                    Complete
                                                </button>
                                            </td>


                                        </tr>
                                    ))

                                }

                            </tbody>

                        </table>
                    </div>

                </div>

            </div>

        </>
    )



}
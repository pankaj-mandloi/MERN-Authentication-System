import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";



export default function AddData() {

    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [assigningDate, setAssigningDate] = useState("");
    const [photo, setPhoto] = useState({ preview: '', data: '', filename: '' });
    const [status, setStatus] = useState("");


    const handleTitle = (evt) => {

        setTitle(evt.target.value);
    }

    const handelDescription = (evt) => {
        setDescription(evt.target.value);
    }

    const handelAssigningData = (evt) => {
        setAssigningDate(evt.target.value);
    }
    const handleSelectPhoto = (evt) => {
        evt.preventDefault();
        // if (evt.target.files && evt.target.files[0]) {
        //     setPhoto(URL.createObjectURL(evt.target.files[0]));
        // }
        // alert("Image uploaded ");
        const img = {
            preview: URL.createObjectURL(evt.target.files[0]),
            data: evt.target.files[0],
        }
        setPhoto(img);

    };
    const handelImageUploaded = async () => {
        const formData = new FormData();
        formData.append('file', photo.data);

        const response = await fetch('http://localhost:5555/mongodbtasks/uploadimage', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        if (data.success) {
            alert("upload image succesfully");
            setPhoto(prev => ({ ...prev, filename: data.filename }));
        }
        else {
            alert("Error uploading image!");
        }

        if (response) {
            setStatus("Statuse" + response.statusText);
        }

    }


    const handelSaveButton = async (evt) => {
        evt.preventDefault();

        if (!title || !description || !assigningDate) {
            alert("Please Fill all details !!")
            return
        }
        if (!photo.filename) {
            alert("Please select photo");
            return
        }


        try {
            const response = await fetch('http://localhost:5555/mongodbtasks/send', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title, description, assigningDate, photo: photo.filename }),


            })
            const data = await response.json();

            if (data.success) {
                alert("Data Saved Succesfully")
                setTitle("");
                setDescription("")
                setAssigningDate("")
                setPhoto({ preview: '', data: '', filename: '' });

            }
            else {
                alert("Error Occured !!")
            }


        } catch (error) {
            alert("POST Api Does not work !!");
        }


    }
    const handleShowTasks = () => {
        navigate("/showtasks");

    }

    const LogoutButton = () => {
        localStorage.removeItem("token");
        navigate("/login");


    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "40px", fontFamily: "Arial, sans-serif" }}>
            <h1 style={{  fontSize: "25px", marginBottom: "20px" }}> Application</h1>

            <div style={{ width: "80%", maxWidth: "600px", backgroundColor: "#f9f9f9", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <form onSubmit={handelSaveButton} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <label style={{ fontWeight: "bold", color: "#555" }}>Enter Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitle}
                        placeholder="Title"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #ccc" }}
                    />

                    <label style={{ fontWeight: "bold", color: "#555" }}>Enter Description</label>
                    <textarea
                        value={description}
                        onChange={handelDescription}
                        placeholder="Description"
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #ccc", resize: "vertical" }}
                    />

                    <label style={{ fontWeight: "bold", color: "#555" }}>Task Assigning Date</label>
                    <input
                        type="date"
                        onChange={handelAssigningData}
                        style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "2px solid #ccc" }}
                    />

                    <label style={{ fontWeight: "bold", color: "#555" }}>Select Image</label>
                    {photo.preview && <img src={photo.preview} alt="preview" style={{ maxWidth: "100px", maxHeight: "100px", marginBottom: "15px" }} />}
                    <input
                        type="file"
                        name="file"
                        onChange={handleSelectPhoto}
                        style={{ padding: "10px", borderRadius: "8px", border: "2px solid #ccc" }}
                    />

                    <button
                        type="button"
                        onClick={handelImageUploaded}
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            marginBottom: "20px"
                        }}
                    >
                        Upload Image
                    </button>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "12px 40px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            width: "100%"
                        }}
                    >
                        Save
                    </button>
                </form>
            </div>

            <div style={{ marginTop: "20px", display: "flex", justifyContent: "space-evenly", width: "100%" }}>
                <button
                    onClick={handleShowTasks}
                    style={{
                        backgroundColor: "blue", color: "white", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "8px", cursor: "pointer"
                    }}
                >
                    Show Tasks
                </button>

                <button
                    onClick={LogoutButton}
                    style={{
                        backgroundColor: "blue", color: "white", padding: "10px 20px", fontSize: "16px", border: "none", borderRadius: "20px", cursor: "pointer",
                        position:"absolute",top:"100px",right:"100px"
                    }}
                >
                    Logout
                </button>
            </div>

            <div style={{ marginTop: "20px" }}>
                <Link
                    to="/profile"
                    style={{
                        padding: "10px ", backgroundColor: "blue", color: "white", textDecoration: "none", borderRadius: "20px", cursor: "pointer",
                        position:"absolute",top:"100px",right:"200px"
                    }}
                >
                    Show Profile
                </Link>
            </div>
        </div>
    );
}
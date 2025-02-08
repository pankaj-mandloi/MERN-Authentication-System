import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
export default function Registration() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate= useNavigate();



    const handelName = (evt) => {
        setName(evt.target.value);

    }
    const handleEmail = (evt) => {
        setEmail(evt.target.value);

    }
    const handlePassword = (evt) => {
        setPassword(evt.target.value);

    }
    const handleConfirmPassword = (evt) => {
        setConfirmPassword(evt.target.value);

    }

    const handleRegistration= async(evt)=>{
        evt.preventDefault();

        if(!name || !email || !password || !confirmPassword){
            alert("Please fill the required Data !!")
            return
        }
    

        try{
            const response = await fetch('http://localhost:5555/mongodbauths/register',{
                method:'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body:JSON.stringify({name,email,password,confirmPassword}),
            })
            const data = await response.json();

            if(data.success){
                alert("User Registered Succesfully");
                setName("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                navigate("/login");
            }
            else{
                alert("Error occur during POST Api for registration !!");
            }

            
        }catch(error){
            alert("Error occur during Registration !!")
        }

    }

    return (
        <>
            <div style={{ padding: "40px", borderRadius: "20px", border: "2px solid black", textAlign: "center", marginLeft: "500px", marginRight: "500px", marginTop: "40px" }}>
                <h3>Registration here!!</h3>
                <div >

                    <input type="text" placeholder="name"  onChange={handelName}   style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray" }} />
                    <input type="email" placeholder="enter email"  onChange={handleEmail} style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />
                    <input type="password" placeholder="password"  onChange={handlePassword}    style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />
                    <input type="password" placeholder="confirm password" onChange={handleConfirmPassword} style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />

                    <div>
                        <button  onClick={handleRegistration}  style={{ backgroundColor: "green", border: "none", color: "white", padding: "15px 35px", borderRadius: "10px", marginTop: "20px", fontSize: "15px" }}>register</button>

                    </div>

                    <div style={{ position: "absolute", top: "380px", right: "640px"}}>
                        <Link to="/login" style={{color:"green"}}>login</Link>
                    </div>
                </div>
            </div>
        </>
    )



}
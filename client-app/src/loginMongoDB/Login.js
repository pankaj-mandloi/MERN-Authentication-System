
import React, { useState } from "react"
import { Link,useNavigate } from "react-router-dom"


export default function Login() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate= useNavigate();

    const handleEmail = (evt) => {
        setEmail(evt.target.value);

    }
    const handlePassword = (evt) => {
        setPassword(evt.target.value);

    }


    const handleLogin = async(evt) => {
        evt.preventDefault();

        if(!email || !password){
            alert("Please fill the required details !!")
            return
        }
        try{
            const response = await fetch('http://localhost:5555/mongodbauths/login',{
                method:'POST',
                headers:{
                    'Content-type': 'application/json'
                },
                body : JSON.stringify({email,password})

            })
            const data= await response.json();
            console.log("Login response ",data);
            if(data.success && data.token){
                setEmail("");
                setPassword("");
                localStorage.setItem("token",data.token);
                // console.log("Login token ",data.token);
                
                navigate("/addData")
                alert("User Succesfully login ");
                
            }
            else{
                alert("Please use correct email and password !!");
            }

        }catch(error){
            alert("Error occur during POST Api for Login !!");
        }



    }




    return (
        <>
            <div>
                <div style={{ padding: "40px", borderRadius: "20px", border: "2px solid black", textAlign: "center", marginLeft: "500px", marginRight: "500px", marginTop: "40px" }}>
                    <h3>Login here!!</h3>
                    <div >


                        <input type="email" placeholder="enter email" onChange={handleEmail} style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />
                        <input type="password" placeholder="password" onChange={handlePassword} style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />


                        <div>
                            <button onClick={handleLogin} style={{ backgroundColor: "green", border: "none", color: "white", padding: "15px 35px", borderRadius: "10px", marginTop: "20px", fontSize: "15px" }}>login</button>

                        </div>

                        <div style={{ position: "fixed", top: "280px", right: "640px" }}>
                            <Link to="/" style={{color:'green'}}>register</Link>
                        </div>
                        <div style={{ position: "fixed", top: "100px", right: "540px"}}>
                              <Link to="/forgotpassword" style={{color:"green"}}>forgotpassword?</Link>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )



}
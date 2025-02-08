
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate,useParams } from "react-router-dom";
export default function ResetPassword() {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
     const[message,setMessage]=useState("");

    const navigate = useNavigate();
    const {token} = useParams();


    const handleSubmitPassword= async(evt)=>{
        evt.preventDefault();

        if(password !==confirmPassword){
            setMessage("Password not metches !!");
            return
        }
        try{
            const response = await fetch('http://localhost:5555/mongodbauths/reset-password',{
                method:'POST',
                headers:{
                     'Content-Type': 'application/json',
                },
                body: JSON.stringify({token,password})
            }) 
            const data = await response.json();
            console.log("Fronten dreste password ",data);
            if(data.success){
                setMessage(data.message); 
                setTimeout(()=>navigate("/login"),2000);
                
            }
            else{
                setMessage("Password does not updated !!");
            }

        }catch(error){
            alert("Reset Password Api Not Working !!");
        }



    }
     

    return (
        <>
            <div  style={{border:"2px solid black",marginLeft:"500px",marginRight:"500px",borderRadius:"20px",marginTop:"40px",textAlign:"center"}}>
                <h3>Reset Password !!</h3>
                <div >
                    <input type="password" placeholder="password" value={password} onChange={(evt)=>setPassword(evt.target.value)} style={{ width: "60%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />
                    <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(evt)=>setConfirmPassword(evt.target.value)} style={{ width: "60%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }} />
                        

                        <div>
                            <button onClick={handleSubmitPassword}   style={{backgroundColor: "green", border: "none", color: "white", padding: "15px 35px", borderRadius: "10px", marginTop: "20px", fontSize: "15px",marginBottom:"20px"}}>
                                   save password
                            </button>
                              <Link to="/login" style={{ marginLeft: "20px", textDecoration: "none", color: "green" }}>login</Link>
                        </div>
                        {message && <p style={{ marginTop: "10px", color: message.includes("success") ? "green" : "red" }}>{message}</p>}
                </div>
            </div>





        </>
    )
}
import React, { useState } from "react";
import { Link} from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  

  const forgetPassword = async () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/mongodbauths/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage(data.message);
        
      } else {
        setMessage(data.message || "Invalid Email!");
      }
    } catch (error) {
      setMessage("An error occurred while sending the request.");
    }
  };

  return (
    <div style={{ border: "2px solid black", marginTop: "100px", margin: "0 auto", width: "300px", borderRadius: "15px", textAlign: "center", padding: "20px" }}>
      <h3>Forgot Password</h3>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "80%", borderRadius: "8px", padding: "12px", border: "2px solid gray", marginTop: "10px" }}
        />
        <div>
          <button
            type="submit"
            onClick={forgetPassword}
            style={{ border: "none", backgroundColor: "green", color: "white", marginTop: "15px", padding: "10px 25px", borderRadius: "8px", marginBottom: "10px" }}
          >
            Submit
          </button>
          <Link to="/login" style={{ marginLeft: "20px", textDecoration: "none", color: "green" }}>Login</Link>
        </div>
        {message && <p style={{ marginTop: "10px", color: message.includes("success") ? "red" : "green" }}>{message}</p>}
      </div>
    </div>
  );
}

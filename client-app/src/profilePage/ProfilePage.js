import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const [profileData, setProfileData] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {

        const fetchProfileData = async () => {
            try {
                const response = await fetch('http://localhost:5555/mongodbauths/profile',{
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                console.log("Profile data:", data);

                setProfileData(data.userData);
                setLoading(false);

            } catch (error) {
                console.log("Error occurred in Profile Page", error);
                setError(error.message);
                setLoading(false);
                navigate("/login"); 
            }
        };

        if (token) {
            fetchProfileData();
        } else {
            setLoading(false);
            navigate("/login"); 
        }
    }, [token, navigate]);

    const handleGoAddDataPage = () => {
        navigate("/addData");
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    const LogoutButton = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <div style={{marginTop:"60px",marginLeft:"550px" ,border: "2px solid black",marginRight:"550px",borderRadius:"30px"}}>
            <h1 style={{textAlign:"center"}}>Welcome User</h1>
            {profileData ? (
                <table>
                    <tbody>

                        <tr >
                            <td><strong>UserId :</strong> {profileData.userId}</td>
                        </tr>
                        <tr>
                        <td><strong>User Name :</strong> {profileData.name}</td>
                        </tr>
                        <tr>
                            <td><strong>Email :</strong> {profileData.email}</td>
                        </tr>
                    </tbody>
                </table>
            ) : (
                <div>No profile data available.</div>
            )}
            <div style={{marginTop:"20px",display:"flex",justifyContent:"center",textAlign:"center",marginBottom:"20px"}}>
                <button onClick={handleGoAddDataPage}  style={{backgroundColor:"green",border:"none",color:"white",padding:"8px 10px",borderRadius:"8px"}}>Go to Add Data Page</button>

                <button onClick={LogoutButton} style={{backgroundColor:"green",border:"none",color:"white",padding:"8px 10px",borderRadius:"8px",marginLeft:"20px"}}>logout</button>
            </div>
        </div>
    );
};

export default ProfilePage;

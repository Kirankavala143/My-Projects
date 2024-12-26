import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Profile.css'
import { Link } from 'react-router-dom';

  const Profile = () => {
    const [userInfo, setUserInfo] = useState({
        _id : '' ,
        name : "",
        phone: '',
        email: '',
        gender: '',
        address: '',
        department: '',
        domain: '',
        profileImage : ""
    });

    async function HandleProfileInfo() {
        const response = await fetch("http://localhost:5000/api/findProfile",{
            credentials : "include"
        })
        const data = await response.json()
        setUserInfo(data)
    }

    useEffect(()=>{
        HandleProfileInfo()
    } , [])


    return (
            <div className="dashboard">
                
                
                <div className="profile-section">
                    
                    <div className="profile-picture">
                        <img 
                            src={userInfo.profileImage} 
                            alt="Profile" 
                            className="profile-pic-circle" 
                        />
                    </div>

                    <div className="form-section">
                        <div className="form-grid">
                            <div>
                                <label> Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={userInfo.name}
                                    placeholder="Enter Your Name"
                                />
                            </div>
                            <div>
                                <label>Phone Number</label>
                                <input
                                    type="text"
                                    name="phone"
                                    value={userInfo.phone}
                                    placeholder="Enter Your Phone Number"
                                />
                            </div>
                            <div>
                                <label>Mail ID</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    placeholder="Enter Your Mail ID"
                                />
                            </div>
                            <div>
                                <label>Gender</label>
                                <input
                                    type="text"
                                    name="gender"
                                    value={userInfo.gender}
                                    placeholder="Select Your Gender"
                                />
                            </div>
                            <div>
                                <label>Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={userInfo.address}
                                    placeholder="Enter Your Address"
                                />
                            </div>
                            <div>
                                <label>Department</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={userInfo.department}
                                    placeholder="Enter Your Department"
                                />
                            </div>
                            <div>
                                <label>Domain</label>
                                <input
                                    type="text"
                                    name="domain"
                                    value={userInfo.domain}
                                    placeholder="Enter Your Domain"
                                />
                            </div>
                        </div>
                            
                         <Link to={`edit/${userInfo._id}`} asChild><button className="edit-btn">Edit</button></Link>
                            
                    </div>
                </div>
            </div>
    );
};

export default Profile;

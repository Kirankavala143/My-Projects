import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Profile.css';

const ProfileUpdate = () => {
    const [userInfo, setUserInfo] = useState({
        _id: '',
        name: '',
        phone: '',
        email: '',
        gender: '',
        address: '',
        department: '',
        domain: '',
        profileImage: ''
    });
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);

    async function handleProfileInfo() {
        const response = await fetch('http://localhost:5000/api/findProfile', {
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        setUserInfo(data);
    }

    useEffect(() => {
        handleProfileInfo();
    }, []);

    const handleChange = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/updateProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify(userInfo)
            });

            if (response.ok) {
                const updatedData = await response.json();
                setUserInfo(updatedData);
                setIsEditing(false);
            } else {
                console.error('Error updating profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

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
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={userInfo.name}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Phone Number</label>
                            <input
                                type="text"
                                name="phone"
                                value={userInfo.phone}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>

                        <div>
                            <label>Gender</label>
                            <input
                                type="text"
                                name="gender"
                                value={userInfo.gender}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={userInfo.address}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Department</label>
                            <input
                                type="text"
                                name="department"
                                value={userInfo.department}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                        <div>
                            <label>Domain</label>
                            <input
                                type="text"
                                name="domain"
                                value={userInfo.domain}
                                onChange={handleChange}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div>
                        {isEditing ? (
                            <>
                                <button onClick={handleUpdate} className="save-btn">
                                    Save
                                </button>
                                <button onClick={() => setIsEditing(false)} className="cancel-btn">
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <button onClick={() => setIsEditing(true)} className="edit-btn">
                                Edit
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileUpdate;

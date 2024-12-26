import React from 'react';
import { FaFileUpload } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";
import { MdLeaderboard } from "react-icons/md";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../pages/User.css';

const UserL = () => {
  const navigate = useNavigate();

  
  const handleLogout = () => {
    
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <div className="container light-mode">
      <div className="sidebar">
        <ul>
          <li className="sidebar-item">
              <img src="/logo.png" className="icon" alt="Free Code Logo" />
              <div className="label">Free Code</div>
          </li>

          <li className="sidebar-item">
            <Link to="/user/profile">
              <PiStudent className='icon' />
              <div className="label">Profile</div>
            </Link>
          </li>
          <li className="sidebar-item">
            <Link to="/user/practice">
              <PiStudent className='icon' />
              <div className="label">Practice</div>
            </Link>
          </li>

          <li className="sidebar-item">
            <Link to="/user/contests">
              <FaFileUpload className='icon' />
              <div className='label'>Contest</div>
            </Link>

          </li>

          <li className="sidebar-item">
            <Link to="/user/leaderboard">
              <MdLeaderboard className='icon l' />
              <div className="label">Leaderboard</div>
            </Link>
          </li>

          <li className="sidebar-item" onClick={handleLogout}>
            <IoIosLogOut className='icon' />
            <div className="label">Logout</div>
          </li>
        </ul>
      </div>

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserL;

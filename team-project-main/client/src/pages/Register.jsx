import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../services/Api";
import { toast } from "react-hot-toast";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const navigate= useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    

    if (!name || !email || !password) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      const request = await post('/api/auth/register', { name, email, password });
      const response = request.data;

      if (request.status === 200) {
        toast.success(response.message);
        navigate('/login');
        
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      const errorMessage = "Registration failed!";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            id="username"
            required 
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="pass">Password</label>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            required 
          />
        </div>
        <button type="submit" disabled={loading}> 
          {loading ? "Registering..." : "Register"}
        </button>
        <p className="register-link">
          Already have an Account? <Link to={"/login"}>Login here</Link>
        </p>
      </form>
    </div>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { toast } from "react-toastify";
import "../css/SignUp.css";

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const submitData = async () => {
    if (!name.trim()) {
      notifyA("Full name is required");
      return;
    }
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }
    if (!passwordRegex.test(password)) {
      notifyA("Password must be 8+ chars with upper, lower, number and symbol");
      return;
    }

    fetch(`${API}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB(data.message || "Account created");
          navigate("/signin");
        }
      })
      .catch(() => notifyA("Something went wrong. Please try again."));
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Logo and Title */}
        <div className="signup-header">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h1 className="logo-text">PostPal</h1>
           
          </div>
          <h2 className="signup-title">Create your account</h2>
        </div>

        {/* Form */}
        <div className="signup-form">
          {/* Name */}
          <div className="input-group">
            <div className="input-container neutral">
              <i className="fas fa-user input-icon"></i>
              <div className="input-content">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="input-control plain"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <div className="input-container neutral">
              <i className="fas fa-envelope input-icon"></i>
              <div className="input-content">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="input-control plain"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div className="input-group">
            <div className="input-container neutral">
              <i className="fas fa-lock input-icon"></i>
              <div className="input-content">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="input-control plain"
                />
              </div>
            </div>
          </div>

          {/* Button */}
          <button className="signup-button" onClick={submitData}>
            Sign Up
          </button>

          <div className="signin-link">
            Already have an account? <Link to="/signin" className="signin-link-text">SignIn</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

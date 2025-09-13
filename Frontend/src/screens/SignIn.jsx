import "../css/SignIn.css";

import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";

function SignIn() {
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);
  const { setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }

    if (!password.trim()) {
      notifyA("Password is required");
      return;
    }

    fetch("/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Sign in successful!");
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("post",JSON.stringify(data.post));
          setUserLogin(true);
          navigate("/");
        }
      })
      .catch(() => {
        notifyA("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="signin-page">
      <div className="signin-container">
        {/* Logo and Title */}
        <div className="signin-header">
          <div className="logo-container">
            <div className="logo-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <h1 className="logo-text">PostPal</h1>
            
          </div>
          <h2 className="signin-title">Sign in to your account</h2>
        </div>

        {/* Form */}
        <div className="signin-form">
          {/* Email Input */}
          <div className="input-group">
            <div className="input-container">
              <i className="fas fa-envelope input-icon"></i>
              <div className="input-content">
                {/* <label className="input-label"></label> */}
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input-control"
                />
              </div>
            </div>
          </div>

          {/* Password Input */}
          <div className="input-group">
            <div className="input-container">
              <i className="fas fa-lock input-icon"></i>
              <div className="input-content">
                {/* <label className="input-label"></label> */}
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input-control"
                />
              </div>
            </div>
          </div>

          {/* Forgot Password */}
          <div className="forgot-password">
            <a href="#" className="forgot-password-link">Forgot password?</a>
          </div>

          {/* Sign In Button */}
          <button className="signin-button" onClick={postData}>
            Sign In
          </button>

          {/* Sign Up Link */}
          <div className="signup-link">
            Don't have an account? <Link to="/signup" className="signup-link-text">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

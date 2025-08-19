import logo from "../assets/img/logo.png";
import "../css/SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { toast } from "react-toastify";

function SignIn() {
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);


  const {setUserLogin}=useContext(LoginContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState(""); // ✅ Empty string initial value
  const [password, setPassword] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const postData = () => {
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
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
          notifyB(data.message);
          console.log(data);
          localStorage.setItem("jwt",data.token);
          localStorage.setItem("user",JSON.stringify(data.user));
          setUserLogin(true);
          navigate("/"); // ✅ Redirect after success
        }
      })
      .catch(() => {
        notifyA("Something went wrong. Please try again.");
      });
  };

  return (
    <div style={{ marginTop: "200px" }}>
      <div className="container2" style={{ textAlign: "center" }}>
        <img className="signup-img2" src={logo} alt="Instagram Logo" />

        <div className="form-container2">
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your Email"
          />

          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your Password"
          />

          <button type="submit" onClick={postData}>
            Sign In
          </button>
          
          <div className="signup-link">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;

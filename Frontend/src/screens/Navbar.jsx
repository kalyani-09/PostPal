import "../css/Navbar.css";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";

function Navbar() {
    const { userLogin } = useContext(LoginContext);
    const { setModalOpen } = useContext(LoginContext);
const API = import.meta.env.VITE_API_BASE_URL;
    const loginData = () => {
        const token = localStorage.getItem("jwt");
        if (userLogin || token) {
            return [
                <li key="home"><Link to="/">Home</Link></li>,
                <li key="profile"><Link to="/profile">Profile</Link></li>,
                <li key="createPost"><Link to="/createPost">CreatePost</Link></li>,
                <li key="myfollowingpost"><Link to="/myfollowingpost">MyFollowingPost</Link></li>,
                <li key="logout"><Link to="" onClick={() => setModalOpen(true)}>LogOut</Link></li>
            ];
        } else {
            return [
                <li key="home"><Link to="/">Home</Link></li>,
                <li key="signup"><Link to="/signup">SignUp</Link></li>,
                <li key="signin"><Link to="/signin">SignIn</Link></li>
            ];
        }
    };

    return (
        <div className="navbar">
            <Link to="/"><img src={logo} alt="No image" /></Link>
            <ul className="nav-menu">
                {loginData()}
            </ul>
        </div>
    );
}

export default Navbar;

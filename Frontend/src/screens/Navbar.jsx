import "../css/Navbar.css";
import logo from "../assets/img/logo.png";
import { Link } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";

function Navbar() {
const {userLogin}=useContext(LoginContext);
const {setModalOpen}=useContext(LoginContext);
    const loginData = (login) => {
        const token = localStorage.getItem("jwt");
        if (userLogin || token) {
            return [
                <>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/createPost">CreatePost</Link></li>
                    <li><Link to="/myfollowingpost">MyFollowingPost</Link></li>
                     <li><Link to={""} onClick={()=>setModalOpen(true)}>LogOut</Link></li>
                </>
            ]
        }
        else {
            return [
                <>
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/signup">SignUp</Link></li>
                    <li><Link to="/signin">SignIn</Link></li>
                </>
            ]
        }
    }
    return (
        <div className="navbar">
            <Link to="/home"><img src={logo} alt="No image" /></Link>
            <ul className="nav-menu">
                {loginData()}

            </ul>
        </div>
    );
}

export default Navbar;

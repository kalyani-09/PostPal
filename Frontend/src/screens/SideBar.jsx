import {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import ProfilePic  from '../components/ProfilePic';
import "../css/SideBar.css";
import { LoginContext } from "../context/LoginContext";
import { useContext } from 'react';


function SideBar({setProfileOpen}){
const [changePic,setChangePic]=useState(false);
 const navigate = useNavigate();  

// const handleLogout=()=>{
//   localStorage.clear();
//   navigate("/signin");
// }
const { setModalOpen } = useContext(LoginContext);
// const {setProfileOpen } = useContext(LoginContext);

const changeProfile = ()=>{
    if(changePic==true){
        setChangePic(false);
        
    }
    else{
        setChangePic(true);
    }
};
 const user = JSON.parse(localStorage.getItem("user"));
const name = user?.name || "Unknown User";
const postsCount = JSON.parse(localStorage.getItem("post")) || 0;
const followersCount = Array.isArray(user?.followers) ? user.followers.length : 0;
const followingCount = Array.isArray(user?.following) ? user.following.length : 0;
const defaultProfile =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAY1BMVEX///8AAAD8/PyMjIwEBASbm5v5+fns7OzOzs48PDwqKirz8/NfX1+3t7fT09MeHh6+vr4RERFxcXEkJCTm5uaAgIBra2s1NTVCQkKpqamjo6PZ2dl5eXmGhoaSkpJPT09XV1fukoBLAAAD60lEQVR4nO2b63aiMBCAk2wgKBdRIqKi9f2fchPAs2zkEg+YjLvz/arFtl/nTCa3kRAEQRAEQRAEQRAEQRAEWQhj7O8X/ddwMUT1S38y76G9mYzyNM0jqa2/xZ2J9HCiHac6Fd+grYKbBRX9iyq4fkHMxX1DX9jcBfQRmiWv2pok8202Tbod9qZ0m/p2G0OnwnlMm3JKzwRmuiinVAnyUXeaEpBDlJFsNE/amG8zeOJaSDyajJgwfwgCLeh6rrxPxbvlDq2e65VUdpqMdxPyUwZtgDId8BlvbQ4v5EQOTJivbCQ48dTGW5dEWOKElHbipW9Pk7CwE9+Fvk0NpJ03pVffpga5rXju29RgfHllcPZtahDYige+TQ2+VvwyP2+2XIAVcsv5p1mUgyKzFYe294z3dt772LepyY+d+I9vTwNmW1YCYGOTsOv0RlmjnvMrMHHG4np6x0mbx3UIawOkcyXfz5irh/ucAFsdqjjGh/kMP8TAtpwNUTEX8SLy7TjM7AoR2sqwRaXAcdr7CO00qKVLc05fxyjnulLCTPAWUbeeQ/GuhW+7cVTM7wMBb7jHIPOkQ6nl1YA3r3KY+d1HXB6d+vM/4I8L4DTpIdO6dx63qVPp28gOlRKxzINj8ngkxyCXMfws6TCLHtgiiCD/I023ByNfU1D+AVgsFPE3BJx1ecH07FMmav5RM1BS6jmI9Z/DQ5uJvK4K41RrX1R1LqB666YxmZa7se3PrkwlzH64sGtp4kML8uY7VZCBOpxoG/Si4+lF94XTMQLUE6c15K3or8AHaR4WN0mgJLvasJ11p8rc0WH3ju0ZzCbuWrZSfFqdN29RX5QA7joZY+F4A9kY2zRknuuLSpNgN3tMa0Re1cbAc7qwMKzpm97t2+sw9Giu4l3Nao5QeYx5SORIX6cNifR3Vi4tjsTHOXg7tWhvT95M8Jbmx2ofV4eqnLHbknhrbsx9VewaUpdocy9Nq4xcR1ew9uw83B4Ky+6xaUrh1Fwn5mVRmjzhFzWJOVPXQyraLkvwzptuI4dni3plVVusYi3Eub5rdjYPqQhFy6WfRA6znJEFU71J4k5clcL1vHULpbuQr1IKnzhst80sG2ntKFy1aTFi8aGCd7i7yhWx4tDUJK4uE/Ni4fKqj/pFhZNGYab7xtaYfHrmgZvJMz6sK851X4ULrlYf43iHjYsTonDN6b6Bu5n2mX2Puz1OWpyXbzVfubkYm+HKVVyTuFjZxhYH+O+ycVFW5AqbZJOdi7OhVZe0T75W/POFfNVd2x8+X8jV7uf2a3VuDo5XPvMHHOz0P3NLCfHGGUEQBEEQBEEQBEEQBEHW4DfUGym9NOGkBQAAAABJRU5ErkJggg==";


 
    return (
        <div>
        <div className="left-sidebar">
          <div className="profile-section">
            <div className="profile-pic" onClick={() => setProfileOpen(true)}>
              <img src={user?.Photos ? user.Photos : defaultProfile} alt="Profile" />
            </div>
            <h3 className="profile-name">{name}</h3>
            <div className="profile-stats">
              <div className="stat">
                <span className="stat-number">{postsCount}</span>
                <span className="stat-label">Posts</span>
              </div>
              <div className="stat">
                <span className="stat-number">{followersCount}</span>
                <span className="stat-label">Followers</span>
              </div>
              <div className="stat">
                <span className="stat-number">{followingCount}</span>
                <span className="stat-label">Following</span>
              </div>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <NavLink 
        to="/" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <i className="fas fa-star"></i>
        <span>Home</span>
      </NavLink>

      <NavLink 
        to="/profile" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <i className="fa-solid fa-user"></i>
        <span>Profile</span>
      </NavLink>

      <NavLink 
        to="/createPost" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <i className="fa-solid fa-plus"></i>
        <span>Create Post</span>
      </NavLink>

      <NavLink 
        to="/myfollowingpost" 
        className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")}
      >
        <i className="fa-solid fa-images"></i>
        <span>My Following Post</span>
      </NavLink>

{/* 
<NavLink to="" className={({ isActive }) => (isActive ? "nav-item active" : "nav-item")} onClick={() => setModalOpen(true)}>LogOut</NavLink> */}
      {/* Logout handled with onClick */}
      <button className="nav-lg" onClick={()=>setModalOpen(true)}>
        <i className="fa-solid fa-right-from-bracket"></i>
        <span>Log Out</span>
           </button> 
          </nav>
        </div>

    {changePic && <ProfilePic changeProfile={changeProfile} />}


        </div>
    )
}
export default SideBar;
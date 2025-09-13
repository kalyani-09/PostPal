// import Navbar from "./screens/Navbar.jsx";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./screens/Home.jsx";
import SideBar from "./screens/SideBar.jsx";
import SignIn from "./screens/SignIn.jsx";
import SignUp from "./screens/SignUp.jsx";
import Profile from "./screens/Profile.jsx";
import CreatePost from "./screens/CreatePost.jsx";
import { LoginContext } from "./context/LoginContext.js";
import Modal from "./components/Modal.jsx"
import ProfilePic from './components/ProfilePic.jsx';


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import OthersProfile from "./components/OthersProfile.jsx";
import MyFollowingPost from "./screens/MyFollowingPost.jsx";
// import { use } from "react";

function App() {

  const [userLogin,setUserLogin]=useState(false);
  const [modalOpen , setModalOpen] =useState(false);
  const [profileOpen,setProfileOpen]=useState(false);
  return (
    <BrowserRouter>
      <div>
        <LoginContext.Provider value={{userLogin,setUserLogin, modalOpen ,setModalOpen}}>
        <Routes>
          <Route path="/" element={<><SideBar/><Home /></>} />
          <Route path="/signin" element={<><SignIn /></>} />
          <Route path="/signup" element={<><SignUp /></>} />
          <Route path="/profile" element={<><SideBar setProfileOpen={setProfileOpen} /><Profile /></>} />
          <Route path="/createPost" element={<><SideBar setProfileOpen={setProfileOpen} /><CreatePost/></>}></Route>
          <Route path="/user/:userid" element={<><SideBar setProfileOpen={setProfileOpen} /><OthersProfile/></>}></Route>
          <Route path="/myfollowingpost" element={<><SideBar setProfileOpen={setProfileOpen} /><MyFollowingPost/></>}></Route>
          
        </Routes>
         <ToastContainer />
         {modalOpen && <Modal/>}
         {profileOpen && <ProfilePic changeProfile={() => setProfileOpen(false)} />}

        </LoginContext.Provider>
      </div>
    </BrowserRouter>
    
  );
}

export default App;

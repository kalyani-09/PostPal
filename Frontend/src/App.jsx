import Navbar from "./screens/Navbar.jsx";
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./screens/Home.jsx";
import SignIn from "./screens/SignIn.jsx";
import SignUp from "./screens/SignUp.jsx";
import Profile from "./screens/Profile.jsx";
import CreatePost from "./screens/CreatePost.jsx";
import { LoginContext } from "./context/LoginContext.js";
import Modal from "./components/Modal.jsx"


import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import OthersProfile from "./components/OthersProfile.jsx";
import MyFollowingPost from "./screens/MyFollowingPost.jsx";
// import { use } from "react";

function App() {

  const [userLogin,setUserLogin]=useState(false);
  const [modalOpen , setModalOpen] =useState(false);
  return (
    <BrowserRouter>
      <div>
        <LoginContext.Provider value={{userLogin,setUserLogin, modalOpen ,setModalOpen}}>
          <Navbar />
         
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createPost" element={<CreatePost/>}></Route>
          <Route path="/user/:userid" element={<OthersProfile/>}></Route>
          <Route path="/myfollowingpost" element={<MyFollowingPost/>}></Route>
        </Routes>
         <ToastContainer />
         {modalOpen && <Modal/>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
    
  );
}

export default App;


import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import "../css/Modal.css";

function Modal() {

    const {setUserLogin} =useContext(LoginContext);
    const {setModalOpen}=useContext(LoginContext);
    const navigate=useNavigate();

    const notifyA=(msg)=>toast.success(msg)
    const handleLogOut=()=>{
        setUserLogin(false);
        localStorage.removeItem("jwt");
        setModalOpen(false);
       
        notifyA("Logout Successfully");
         navigate("/signin");
    }
  return (
   <div className="darkBg">
     <div className="centered">
 <div className="modal">
      <div className="modalHeader">
        <h5 className="heading">Confirmation</h5>
      </div>
      <button className="closeBtn" onClick={()=>setModalOpen(false)}>
        <i class="fa-solid fa-circle-xmark"></i>
      </button>

      <div className="modalContent">
        Are you really want to log out?
      </div>

      <div className="modalActions">
        <div className="actionsContainer">
          <button className="logOutBtn" onClick={()=>handleLogOut()}>LogOut</button>
          <button className="cancelBtn" onClick={()=>setModalOpen(false)}>Cancel</button>
        </div>
      </div>
    </div>
    </div>
   </div>
   
  );
}

export default Modal;

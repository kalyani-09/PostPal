import "../css/Profilepic.css"
import { useEffect,useState,useRef } from "react";
import {toast} from "react-toastify";

function ProfilePic({changeProfile}){
   const hiddenFileInput=useRef(null);
   const [image,setImage]=useState("");
   const [url,setUrl]=useState("");

   const notifyA=(msg)=>toast.error(msg);
   const notifyB=(msg)=>toast.success(msg);

    const handleClick=()=>{
  hiddenFileInput.current.click();
    };

  
    useEffect(()=>{
        if(image){
              postDetails();
        }
    },[image]);

    const postPic=()=>{
         fetch("/uploadProfilePic",
            {
                "method":"PUT",
                "headers":{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt"),
                },
                "body":JSON.stringify({
                    
                    image:url,
                }),
            }
         ).then(res=>res.json())
         .then((data)=>{
            console.log(data);
            changeProfile();
            window.location.reload();
            if(data.error){
                notifyA("Something went Wrong");
                // navigate("/home");
            }else{
                notifyB("Successfully posted");
                // navigate("/home");
            }
        })
         .catch((err)=>console.log(err));
    }

    useEffect(()=>{
        if(url){
            postPic();
        }
    },

    )

    const postDetails=()=>{

        //saving Image in the CLoudinary
         const data=new FormData();
         data.append("cloud_name","dka4rc69j");
         data.append("file",image);
         data.append("upload_preset","Insta-Clone");

         fetch("https://api.cloudinary.com/v1_1/dka4rc69j/image/upload ",{
            "method":"POST",
            "body":data,
         }).then((res)=>res.json())
         .then((data)=>setUrl(data.url))
         .catch((error)=>console.log(error));
         

         //Saving the url from the clodinary to the mongodb atlas
        

   };
    return (
        <div className="profile-Pic darkBg">
            <div className="changePic centered">
                <div>
                    <h2>Change Profile Photo</h2>
                </div>
                <hr></hr>
                <div>
                    <button className="upload-btn1" style={{color:"#ED4956",background:"none"}} onClick={handleClick}>Upload Photo</button>
                    <input onChange={(e)=>{setImage(e.target.files[0])}}type="file" accept="image/*" style={{display:"none"}}ref={hiddenFileInput}></input>

                </div>
                <hr></hr>
                <div>
                    <button className="upload-btn1" style={{color:"#ED4956",background:"none"}} onClick={()=>{setUrl(null);postPic()}}>Remove Current Photo</button>
                </div>
                <hr></hr>
                <div>
                    <button onClick={changeProfile} style={{background:"none",border:"none",cursor:"pointer",fontSize:"15px" ,color:"black"}}>cancel</button>
                </div>
            </div>
     
        </div>
    )
}
export default ProfilePic;
import defaultProfile from "../assets/img/default-profile.jpg";
import "../css/CreatePost.css";
import { useState , useEffect} from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SuggestCaptions from "../components/SuggestCaptions";

function CreatePost(){

   const navigate = useNavigate(); 
   const [body,setBody]=useState("");
   const [image, setImage]=useState("");
   const [url,setUrl]=useState("");
//    const [data,setData]=useState("");
   
   

   const notifyA=(msg)=>toast.error(msg);
   const notifyB=(msg)=>toast.success(msg);

   useEffect(()=>{
    if(url){
          fetch("/createPost",
            {
                "method":"POST",
                "headers":{
                    "Content-Type":"application/json",
                    "Authorization":"Bearer "+ localStorage.getItem("jwt"),
                },
                "body":JSON.stringify({
                    body,
                    image:url,
                }),
            }
         ).then(res=>res.json())
         .then((data)=>{
            console.log(data);
            if(data.error){
                notifyA(data.error);
                navigate("/home");
            }else{
                notifyB("Successfully posted");
                navigate("/home");
            }
        })
         .catch((err)=>console.log(err));
    }
   },[url]);

   const postDetails=()=>{

        //sAvaing Image in the CLoudinary
         const data=new FormData();
         data.append("cloud_name","dka4rc69j");
         data.append("file",image);
         data.append("upload_preset","Insta-Clone");

         fetch("https://api.cloudinary.com/v1_1/dka4rc69j/image/upload ",{
            "method":"POST",
            "body":data,
         }).then((res)=>res.json())
         .then((data)=>{
            console.log(data);
            // setData(data);
            setUrl(data.url)})
         .catch((error)=>console.log(error));
         

         //Saving the url from the clodinary to the mongodb atlas
        

   };

    function loadFile(event){
       var output=document.getElementById("output");
       output.src=URL.createObjectURL(event.target.files[0]);
       output.onload=()=>{
        URL.revokeObjectURL(output.src)
       }
    }

    return (
        <div className="createPost" >
            <div className="post-header">
                <h4 style={{margin:"3px auto"}}>Create New Post</h4>
                <button className="share-btn" onClick={postDetails}>Share</button>
            </div>

            <div className="main-div">
                <img id="output" src="https://www.shutterstock.com/image-vector/picture-icon-260nw-323592404.jpg" alt="Preview"/>
                <input type="file" accept="image/*" onChange={(event)=>{
                    loadFile(event);
                    setImage(event.target.files[0]);
                    }}></input>
            </div>
            <div className="details">
                <div className="card-header">
                    <img src={defaultProfile} alt="No Profile Image"/>
                </div>
                <h5>{localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "Unkonwn User"}</h5>

            </div>
            <textarea value={body} onChange={(event)=>{setBody(event.target.value)}} type="text" placeholder="Write a Caption......"></textarea>
            <SuggestCaptions/>
        </div>
    )
}

export default CreatePost;
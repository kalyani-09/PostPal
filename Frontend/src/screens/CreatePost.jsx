// import defaultProfile from "../assets/img/default-profile.jpg";
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
   const defaultProfile="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAY1BMVEX///8AAAD8/PyMjIwEBASbm5v5+fns7OzOzs48PDwqKirz8/NfX1+3t7fT09MeHh6+vr4RERFxcXEkJCTm5uaAgIBra2s1NTVCQkKpqamjo6PZ2dl5eXmGhoaSkpJPT09XV1fukoBLAAAD60lEQVR4nO2b63aiMBCAk2wgKBdRIqKi9f2fchPAs2zkEg+YjLvz/arFtl/nTCa3kRAEQRAEQRAEQRAEQRAEWQhj7O8X/ddwMUT1S38y76G9mYzyNM0jqa2/xZ2J9HCiHac6Fd+grYKbBRX9iyq4fkHMxX1DX9jcBfQRmiWv2pok8202Tbod9qZ0m/p2G0OnwnlMm3JKzwRmuiinVAnyUXeaEpBDlJFsNE/amG8zeOJaSDyajJgwfwgCLeh6rrxPxbvlDq2e65VUdpqMdxPyUwZtgDId8BlvbQ4v5EQOTJivbCQ48dTGW5dEWOKElHbipW9Pk7CwE9+Fvk0NpJ03pVffpga5rXju29RgfHllcPZtahDYige+TQ2+VvwyP2+2XIAVcsv5p1mUgyKzFYe294z3dt772LepyY+d+I9vTwNmW1YCYGOTsOv0RlmjnvMrMHHG4np6x0mbx3UIawOkcyXfz5irh/ucAFsdqjjGh/kMP8TAtpwNUTEX8SLy7TjM7AoR2sqwRaXAcdr7CO00qKVLc05fxyjnulLCTPAWUbeeQ/GuhW+7cVTM7wMBb7jHIPOkQ6nl1YA3r3KY+d1HXB6d+vM/4I8L4DTpIdO6dx63qVPp28gOlRKxzINj8ngkxyCXMfws6TCLHtgiiCD/I023ByNfU1D+AVgsFPE3BJx1ecH07FMmav5RM1BS6jmI9Z/DQ5uJvK4K41RrX1R1LqB666YxmZa7se3PrkwlzH64sGtp4kML8uY7VZCBOpxoG/Si4+lF94XTMQLUE6c15K3or8AHaR4WN0mgJLvasJ11p8rc0WH3ju0ZzCbuWrZSfFqdN29RX5QA7joZY+F4A9kY2zRknuuLSpNgN3tMa0Re1cbAc7qwMKzpm97t2+sw9Giu4l3Nao5QeYx5SORIX6cNifR3Vi4tjsTHOXg7tWhvT95M8Jbmx2ofV4eqnLHbknhrbsx9VewaUpdocy9Nq4xcR1ew9uw83B4Ky+6xaUrh1Fwn5mVRmjzhFzWJOVPXQyraLkvwzptuI4dni3plVVusYi3Eub5rdjYPqQhFy6WfRA6znJEFU71J4k5clcL1vHULpbuQr1IKnzhst80sG2ntKFy1aTFi8aGCd7i7yhWx4tDUJK4uE/Ni4fKqj/pFhZNGYab7xtaYfHrmgZvJMz6sK851X4ULrlYf43iHjYsTonDN6b6Bu5n2mX2Puz1OWpyXbzVfubkYm+HKVVyTuFjZxhYH+O+ycVFW5AqbZJOdi7OhVZe0T75W/POFfNVd2x8+X8jV7uf2a3VuDo5XPvMHHOz0P3NLCfHGGUEQBEEQBEEQBEEQBEHW4DfUGym9NOGkBQAAAABJRU5ErkJggg=="
   

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
                navigate("/");
            }else{
                notifyB("Successfully posted");
                navigate("/");
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
                {/* <div className="card-header">
                    <img src={defaultProfile} alt="No Profile Image"/>
                </div> */}
                <h5>{localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).name : "Unkonwn User"}</h5>

            </div>
            <textarea value={body} onChange={(event)=>{setBody(event.target.value)}} type="text" placeholder="Write a Caption......"></textarea>
            <SuggestCaptions/>
        </div>
    )
}

export default CreatePost;
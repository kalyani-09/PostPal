import defaultProfile from "../assets/img/default-profile.jpg";
import "../css/Profile.css";
import { useEffect, useState } from "react";
import PostDetails from "../components/PostDetails";
import ProfilePic from "../components/ProfilePic";

function Profile() {
// const [mypost, setMypost] = useState([]);
  

  const [detail, setDetail] = useState(false);
  const [item,setItem]=useState(null);
  const [posts,setPosts]=useState([]);//store only posts array
  const [user,setUser]=useState(null);//store user object
  const [changePic , setChangePic]=useState(false);

  const changeProfile=()=>{
    if(changePic){
        setChangePic(false);
    }else{
        setChangePic(true);
    }
  }
 
 const showPost=(post)=>{
       setDetail(true);
       setItem(post);
 }
 const dontShowPost=(post)=>{
    setDetail(false);
    setItem(null);
 };
    useEffect(() => {
        fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {

            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
        }
        ).then(res => res.json())
            .then(data => {
                console.log(data);
                
                setPosts(data.post);
                setUser(data.user);
            })
            .catch(error => console.log(error));
    }, [])


    return (
        <div className="profile" >
            <div className="profile-frame">
                <div className="profile-pic">
                    <img  onClick={changeProfile} src={user?.Photos ? user.Photos : defaultProfile} alt="No Profile" />
                </div>

                <div className="profile-data">
                    <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
                    <div className="profile-info">
                        <p>{posts? posts.length :"0"} Posts</p>
                        <p>{user ? user.followers.length :"0"} Followers</p>
                        <p>{user ? user.following.length : "0"} Following</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "90%", margin: "auto", opacity: "0.8" }}></hr>
            <div className="gallery">
                {
                    posts.map((post) => (
                        <img onClick={()=>showPost(post)} src={post.photo} alt="Found No Pic" />
                    ))
                }
            </div>
           { detail && item && <PostDetails item={item} showPost={showPost} dontShowPost={dontShowPost}/>}
           {
            changePic && <ProfilePic changeProfile={changeProfile}/>
           }
        </div>

    )
}
export default Profile;
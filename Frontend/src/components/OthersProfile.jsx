import { useParams } from "react-router-dom";
import defaultProfile from "../assets/img/default-profile.jpg";
import "../css/Profile.css";
import { useEffect, useState } from "react";

// import PostDetails from "./PostDetails";

function OthersProfile() {
    // const [mypost, setMypost] = useState([]);
     

   
    const { userid } = useParams();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [isFollow, setIsFollow] = useState(false);


    const handleFollow = async (followid) => {
        let response;
        try {
            if (!isFollow) {
                response = await fetch("/follow", {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    },
                    "body": JSON.stringify({
                        followid: followid
                    }
                    )
                }
                )
            }
            else {
                response =  await fetch("/unfollow", {
                    "method": "PUT",
                    "headers": {
                        "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("jwt"),
                    },
                    "body": JSON.stringify({
                        followid: followid
                    }
                    )
                })
            }
            const data = await response.json();
            if (!data.error) {
                setIsFollow(!isFollow);//toggle the isFollow
            }

        }
        catch (err) {
            console.log(err);
        }
    }




    useEffect(() => {
        fetch(`/user/${userid}`, {

            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt"),
            },
        }
        ).then(res => res.json())
            .then(result => {
                console.log(result);
                setUser(result.user);
                setPosts(result.post || []);
                if (result.user.followers.includes(JSON.parse(localStorage.getItem("user"))._id)) {
                    setIsFollow(true);
                } else {
                    setIsFollow(false);
                }
            })
            .catch(error => console.log(error));
    }, [userid])


    return (
        <div className="profile" >
            <div className="profile-frame">
                <div className="profile-pic">
                    <img src={user?.Photos ? user.Photos : defaultProfile} alt="No Profile" />
                </div>

                <div className="profile-data">
                    <div className="profile-name" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <h1>{user?.name || "Unknown User"}</h1>
                        <button style={{ marginLeft: "20px", height: "35px", fontWeight: "bolder" }} onClick={()=>handleFollow(userid)}>
                            {isFollow ? "Unfollow" : "Follow"}
                        </button>

                    </div>
                    <div className="profile-info">
                        <p>{posts.length} Posts</p>
                        <p>{user?.followers ? user.followers : "0"} Followers</p>
                        <p>{user?.following ? user.following : "0"} Following</p>
                    </div>
                </div>
            </div>
            <hr style={{ width: "90%", margin: "auto", opacity: "0.8" }}></hr>
            <div className="gallery">
                {
                    posts.map((pic) => (
                        <img onClick={() => showPost(pic)} src={pic.photo} alt="Found No Pic" />
                    ))
                }
            </div>
            {/* { detail && item && <PostDetails item={item} showPost={showPost} dontShowPost={dontShowPost}/>} */}
        </div>

    )
}
export default OthersProfile;
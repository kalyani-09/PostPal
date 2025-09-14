import { useParams } from "react-router-dom";
// import defaultProfile from "../assets/img/default-profile.jpg";
// import "../css/Profile.css";
import { useEffect, useState } from "react";
import "../css/OthersProfile.css";
// import PostDetails from "./PostDetails";

function OthersProfile() {
    // const [mypost, setMypost] = useState([]);



    const { userid } = useParams();
    const [user, setUser] = useState();
    const [posts, setPosts] = useState([]);
    const [isFollow, setIsFollow] = useState(false);
    const defaultProfile = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAY1BMVEX///8AAAD8/PyMjIwEBASbm5v5+fns7OzOzs48PDwqKirz8/NfX1+3t7fT09MeHh6+vr4RERFxcXEkJCTm5uaAgIBra2s1NTVCQkKpqamjo6PZ2dl5eXmGhoaSkpJPT09XV1fukoBLAAAD60lEQVR4nO2b63aiMBCAk2wgKBdRIqKi9f2fchPAs2zkEg+YjLvz/arFtl/nTCa3kRAEQRAEQRAEQRAEQRAEWQhj7O8X/ddwMUT1S38y76G9mYzyNM0jqa2/xZ2J9HCiHac6Fd+grYKbBRX9iyq4fkHMxX1DX9jcBfQRmiWv2pok8202Tbod9qZ0m/p2G0OnwnlMm3JKzwRmuiinVAnyUXeaEpBDlJFsNE/amG8zeOJaSDyajJgwfwgCLeh6rrxPxbvlDq2e65VUdpqMdxPyUwZtgDId8BlvbQ4v5EQOTJivbCQ48dTGW5dEWOKElHbipW9Pk7CwE9+Fvk0NpJ03pVffpga5rXju29RgfHllcPZtahDYige+TQ2+VvwyP2+2XIAVcsv5p1mUgyKzFYe294z3dt772LepyY+d+I9vTwNmW1YCYGOTsOv0RlmjnvMrMHHG4np6x0mbx3UIawOkcyXfz5irh/ucAFsdqjjGh/kMP8TAtpwNUTEX8SLy7TjM7AoR2sqwRaXAcdr7CO00qKVLc05fxyjnulLCTPAWUbeeQ/GuhW+7cVTM7wMBb7jHIPOkQ6nl1YA3r3KY+d1HXB6d+vM/4I8L4DTpIdO6dx63qVPp28gOlRKxzINj8ngkxyCXMfws6TCLHtgiiCD/I023ByNfU1D+AVgsFPE3BJx1ecH07FMmav5RM1BS6jmI9Z/DQ5uJvK4K41RrX1R1LqB666YxmZa7se3PrkwlzH64sGtp4kML8uY7VZCBOpxoG/Si4+lF94XTMQLUE6c15K3or8AHaR4WN0mgJLvasJ11p8rc0WH3ju0ZzCbuWrZSfFqdN29RX5QA7joZY+F4A9kY2zRknuuLSpNgN3tMa0Re1cbAc7qwMKzpm97t2+sw9Giu4l3Nao5QeYx5SORIX6cNifR3Vi4tjsTHOXg7tWhvT95M8Jbmx2ofV4eqnLHbknhrbsx9VewaUpdocy9Nq4xcR1ew9uw83B4Ky+6xaUrh1Fwn5mVRmjzhFzWJOVPXQyraLkvwzptuI4dni3plVVusYi3Eub5rdjYPqQhFy6WfRA6znJEFU71J4k5clcL1vHULpbuQr1IKnzhst80sG2ntKFy1aTFi8aGCd7i7yhWx4tDUJK4uE/Ni4fKqj/pFhZNGYab7xtaYfHrmgZvJMz6sK851X4ULrlYf43iHjYsTonDN6b6Bu5n2mX2Puz1OWpyXbzVfubkYm+HKVVyTuFjZxhYH+O+ycVFW5AqbZJOdi7OhVZe0T75W/POFfNVd2x8+X8jV7uf2a3VuDo5XPvMHHOz0P3NLCfHGGUEQBEEQBEEQBEEQBEHW4DfUGym9NOGkBQAAAABJRU5ErkJggg=="
const API = import.meta.env.VITE_API_BASE_URL;
    const handleFollow = async (followid) => {
        let response;
        try {
            if (!isFollow) {
                response = await fetch(`${API}/follow`, {
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
                response = await fetch(`${API}/unfollow`, {
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
        fetch(`${API}/user/${userid}`, {

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
            <div className="profile-frame" >
                <div className="profile-header">
                    <div className="profile-pic">
                        <img src={user?.Photos ? user.Photos : defaultProfile} alt="No Profile" />
                    </div>
                    <div className="profile-name" >
                        <h3>{user?.name || "Unknown User"}</h3>
                        <button style={{
                            borderRadius: "57px",
                            marginLeft: "0",
                            height: "35px",background: "linear-gradient(135deg, #667eea, #764ba2)",
                            width: "130px",
                            fontSize: "20px"
                        }} onClick={() => handleFollow(userid)}>
                            {isFollow ? "Unfollow" : "Follow"}
                        </button>

                    </div>
                </div>


                <div className="profile-data">


                    <div className="profile-stats">
                        <div className="stat">
                            <span className="stat-number">
                                {user?.posts?.length ? user.posts.length : "0"}
                            </span>
                            <span className="stat-label-p">Posts</span>
                        </div>

                        <div className="stat">
                            <span className="stat-number">
                                {user?.followers?.length ? user.followers.length : "0"}
                            </span>
                            <span className="stat-label-p">Followers</span>
                        </div>

                        <div className="stat">
                            <span className="stat-number">
                                {user?.following?.length ? user.following.length : "0"}
                            </span>
                            <span className="stat-label-p">Following</span>
                        </div>


                    </div>
                </div>
            </div>

            <div className="main-layout">
                <div className="gallery">
                    {
                        posts.map((pic) => (
                            <img onClick={() => showPost(pic)} src={pic.photo} alt="Found No Pic" />
                        ))
                    }
                </div>
            </div>
            {/* { detail && item && <PostDetails item={item} showPost={showPost} dontShowPost={dontShowPost}/>} */}
        </div>

    )
}
export default OthersProfile;
// import defaultProfile from "../assets/img/default-profile.jpg";
import "../css/Profile.css";
import { useEffect, useState } from "react";
import PostDetails from "../components/PostDetails";
import {Link} from "react-router-dom";
import ProfilePic from "../components/ProfilePic";

function Profile() {
  const [detail, setDetail] = useState(false);
  const [item, setItem] = useState(null);
  const [posts, setPosts] = useState([]); // store only posts array
  const [user, setUser] = useState(null); // store user object
  const [changePic, setChangePic] = useState(false);

  const defaultProfile =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAY1BMVEX///8AAAD8/PyMjIwEBASbm5v5+fns7OzOzs48PDwqKirz8/NfX1+3t7fT09MeHh6+vr4RERFxcXEkJCTm5uaAgIBra2s1NTVCQkKpqamjo6PZ2dl5eXmGhoaSkpJPT09XV1fukoBLAAAD60lEQVR4nO2b63aiMBCAk2wgKBdRIqKi9f2fchPAs2zkEg+YjLvz/arFtl/nTCa3kRAEQRAEQRAEQRAEQRAEWQhj7O8X/ddwMUT1S38y76G9mYzyNM0jqa2/xZ2J9HCiHac6Fd+grYKbBRX9iyq4fkHMxX1DX9jcBfQRmiWv2pok8202Tbod9qZ0m/p2G0OnwnlMm3JKzwRmuiinVAnyUXeaEpBDlJFsNE/amG8zeOJaSDyajJgwfwgCLeh6rrxPxbvlDq2e65VUdpqMdxPyUwZtgDId8BlvbQ4v5EQOTJivbCQ48dTGW5dEWOKElHbipW9Pk7CwE9+Fvk0NpJ03pVffpga5rXju29RgfHllcPZtahDYige+TQ2+VvwyP2+2XIAVcsv5p1mUgyKzFYe294z3dt772LepyY+d+I9vTwNmW1YCYGOTsOv0RlmjnvMrMHHG4np6x0mbx3UIawOkcyXfz5irh/ucAFsdqjjGh/kMP8TAtpwNUTEX8SLy7TjM7AoR2sqwRaXAcdr7CO00qKVLc05fxyjnulLCTPAWUbeeQ/GuhW+7cVTM7wMBb7jHIPOkQ6nl1YA3r3KY+d1HXB6d+vM/4I8L4DTpIdO6dx63qVPp28gOlRKxzINj8ngkxyCXMfws6TCLHtgiiCD/I023ByNfU1D+AVgsFPE3BJx1ecH07FMmav5RM1BS6jmI9Z/DQ5uJvK4K41RrX1R1LqB666YxmZa7se3PrkwlzH64sGtp4kML8uY7VZCBOpxoG/Si4+lF94XTMQLUE6c15K3or8AHaR4WN0mgJLvasJ11p8rc0WH3ju0ZzCbuWrZSfFqdN29RX5QA7joZY+F4A9kY2zRknuuLSpNgN3tMa0Re1cbAc7qwMKzpm97t2+sw9Giu4l3Nao5QeYx5SORIX6cNifR3Vi4tjsTHOXg7tWhvT95M8Jbmx2ofV4eqnLHbknhrbsx9VewaUpdocy9Nq4xcR1ew9uw83B4Ky+6xaUrh1Fwn5mVRmjzhFzWJOVPXQyraLkvwzptuI4dni3plVVusYi3Eub5rdjYPqQhFy6WfRA6znJEFU71J4k5clcL1vHULpbuQr1IKnzhst80sG2ntKFy1aTFi8aGCd7i7yhWx4tDUJK4uE/Ni4fKqj/pFhZNGYab7xtaYfHrmgZvJMz6sK851X4ULrlYf43iHjYsTonDN6b6Bu5n2mX2Puz1OWpyXbzVfubkYm+HKVVyTuFjZxhYH+O+ycVFW5AqbZJOdi7OhVZe0T75W/POFfNVd2x8+X8jV7uf2a3VuDo5XPvMHHOz0P3NLCfHGGUEQBEEQBEEQBEEQBEHW4DfUGym9NOGkBQAAAABJRU5ErkJggg==";

  const changeProfile = () => setChangePic((p) => !p);

  const showPost = (post) => {
    setDetail(true);
    setItem(post);
  };
  const dontShowPost = () => {
    setDetail(false);
    setItem(null);
  };

  useEffect(() => {
    fetch(`/user/${JSON.parse(localStorage.getItem("user"))._id}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data.post);
        setUser(data.user);
      })
      .catch((error) => console.log(error));
  }, []);

  const name = JSON.parse(localStorage.getItem("user")).name;
  const postsCount = posts ? posts.length : 0;
  const followersCount = user ? user.followers.length : 0;
  const followingCount = user ? user.following.length : 0;

  return (
    <div className="pp-page">
      

      <div className="pp-layout">
        
        

        {/* Main Content */}
        <main className="pp-main">
          {/* Posts grid */}
          <section className="pp-posts-grid">
            {posts.map((post) => (
             <div className="pp-post-card" key={post._id}>
                  <div className="post-image-container" onClick={() => showPost(post)}>
                    <img src={post.photo} alt="Post" className="post-image" />
                   
                  </div>
                  <div className="pp-post-content" >
                    <div className="pp-post-content-header" style={{display:"flex" , justifyContent:"space-between"}}>
                      <div className="pp-post-content-leftheader"style={{display:"flex"}}>
                        <img src={user?.Photos ? user.Photos : defaultProfile} alt="Profile" className="post-author-pic" />
                      <h5 style={{marginTop:"-0.1px ",    marginLeft: "7px",fontSize: "15px"}}>{user?.name ? user.name : "Unknown User"}</h5>
                      </div>
                      <div className="pp-post-content-rightheader">
                         <i className="fa-solid fa-trash" onClick={()=>deletePost(post._id)}></i>
                      </div>
                      
                    
                    </div>
                    <p className="pp-post-caption">{post.body}</p>
                    <div className="pp-post-interactions">
                      <button
                        className={`like-btn ${post.likes && post.likes.includes(
                          JSON.parse(localStorage.getItem("user"))._id
                        ) ? 'liked' : ''}`}
                        onClick={() => 
                          post.likes && post.likes.includes(
                            JSON.parse(localStorage.getItem("user"))._id
                          ) ? unlikePost(post._id) : likePost(post._id)
                        }
                      >
                        <i className={`fa-${post.likes && post.likes.includes(
                          JSON.parse(localStorage.getItem("user"))._id
                        ) ? 'solid' : 'regular'} fa-heart`}></i>
                        <span className="pp-post-likes" style={{color:"black"}}>{post.likes?.length || 0} </span>
                      </button>
                      <button className="pp-comment-btn" >
                        <i className="fas fa-comment"></i>
                      </button>
                      <button className="pp-share-btn" onClick={() => showPost(post)}>
                        View Comments
                      </button>
                    </div>
                  </div>
                </div>
            ))}
          </section>
        </main>
      </div>

      {detail && item && (
        <PostDetails item={item} showPost={showPost} dontShowPost={dontShowPost} />
      )}
      {changePic && <ProfilePic changeProfile={changeProfile} />}
    </div>
  );
}
export default Profile;

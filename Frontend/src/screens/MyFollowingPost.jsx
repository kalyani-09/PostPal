import { useEffect, useState } from "react";
import girlProfile from "../assets/img/girl-profile.jpg";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.png";

function MyFollowingPost() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [closeComment, setCloseComment] = useState(false);
  const [item, setItem] = useState([]);

  const defaultProfile="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAY1BMVEX///8AAAD8/PyMjIwEBASbm5v5+fns7OzOzs48PDwqKirz8/NfX1+3t7fT09MeHh6+vr4RERFxcXEkJCTm5uaAgIBra2s1NTVCQkKpqamjo6PZ2dl5eXmGhoaSkpJPT09XV1fukoBLAAAD60lEQVR4nO2b63aiMBCAk2wgKBdRIqKi9f2fchPAs2zkEg+YjLvz/arFtl/nTCa3kRAEQRAEQRAEQRAEQRAEWQhj7O8X/ddwMUT1S38y76G9mYzyNM0jqa2/xZ2J9HCiHac6Fd+grYKbBRX9iyq4fkHMxX1DX9jcBfQRmiWv2pok8202Tbod9qZ0m/p2G0OnwnlMm3JKzwRmuiinVAnyUXeaEpBDlJFsNE/amG8zeOJaSDyajJgwfwgCLeh6rrxPxbvlDq2e65VUdpqMdxPyUwZtgDId8BlvbQ4v5EQOTJivbCQ48dTGW5dEWOKElHbipW9Pk7CwE9+Fvk0NpJ03pVffpga5rXju29RgfHllcPZtahDYige+TQ2+VvwyP2+2XIAVcsv5p1mUgyKzFYe294z3dt772LepyY+d+I9vTwNmW1YCYGOTsOv0RlmjnvMrMHHG4np6x0mbx3UIawOkcyXfz5irh/ucAFsdqjjGh/kMP8TAtpwNUTEX8SLy7TjM7AoR2sqwRaXAcdr7CO00qKVLc05fxyjnulLCTPAWUbeeQ/GuhW+7cVTM7wMBb7jHIPOkQ6nl1YA3r3KY+d1HXB6d+vM/4I8L4DTpIdO6dx63qVPp28gOlRKxzINj8ngkxyCXMfws6TCLHtgiiCD/I023ByNfU1D+AVgsFPE3BJx1ecH07FMmav5RM1BS6jmI9Z/DQ5uJvK4K41RrX1R1LqB666YxmZa7se3PrkwlzH64sGtp4kML8uY7VZCBOpxoG/Si4+lF94XTMQLUE6c15K3or8AHaR4WN0mgJLvasJ11p8rc0WH3ju0ZzCbuWrZSfFqdN29RX5QA7joZY+F4A9kY2zRknuuLSpNgN3tMa0Re1cbAc7qwMKzpm97t2+sw9Giu4l3Nao5QeYx5SORIX6cNifR3Vi4tjsTHOXg7tWhvT95M8Jbmx2ofV4eqnLHbknhrbsx9VewaUpdocy9Nq4xcR1ew9uw83B4Ky+6xaUrh1Fwn5mVRmjzhFzWJOVPXQyraLkvwzptuI4dni3plVVusYi3Eub5rdjYPqQhFy6WfRA6znJEFU71J4k5clcL1vHULpbuQr1IKnzhst80sG2ntKFy1aTFi8aGCd7i7yhWx4tDUJK4uE/Ni4fKqj/pFhZNGYab7xtaYfHrmgZvJMz6sK851X4ULrlYf43iHjYsTonDN6b6Bu5n2mX2Puz1OWpyXbzVfubkYm+HKVVyTuFjZxhYH+O+ycVFW5AqbZJOdi7OhVZe0T75W/POFfNVd2x8+X8jV7uf2a3VuDo5XPvMHHOz0P3NLCfHGGUEQBEEQBEEQBEEQBEHW4DfUGym9NOGkBQAAAABJRU5ErkJggg=="
const API = import.meta.env.VITE_API_BASE_URL;
  const checkLogin = () => {
    const token = localStorage.getItem("jwt");
    if (!token) {
      navigate("/signin");
    }
  };

  const showComment = (item) => {
    if (closeComment) {
      setCloseComment(false);
      setItem({});
    } else {
      setCloseComment(true);
      setItem(item);
    }
  };

  useEffect(() => {
    checkLogin();

    fetch(`${API}/myfollowingpost`, {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((posts) => {
        if (Array.isArray(posts)) {
          setData(posts);
        } else {
          console.error("Unexpected API response:", posts);
          setData([]); // safe fallback
        }
      })
      .catch((error) => {
        console.error(error);
        setData([]);
      });
  }, []);

  const likePost = (id) => {
    fetch(`${API}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const unlikePost = (id) => {
    fetch(`${API}/unlikes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  const postComment = (text, id) => {
    fetch(`${API}/comment`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        text: text,
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((posts) => {
          if (posts._id === result._id) {
            return result;
          } else {
            return posts;
          }
        });
        setData(newData);
        setComment(""); // clear input after posting

        // If popup is open for this post, update item as well
        if (closeComment && item._id === result._id) {
          setItem(result);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{display:"flex"}}>
     
      <div className="main-layout" style={{marginLeft:"200px"}}>
       

        {/* Main Content */}
        <div className="main-content">
          {data.length === 0 ? (
            <p>No posts found.</p>
          ) : (
            <div className="posts-grid">
              {data.map((post) => (
                <div className="post-card" key={post._id}>
                  <div className="post-image-container" onClick={() => showComment(post)} >
                    <img src={post.photo} alt="Post" className="post-image" />
                   
                  </div>
                  <div className="post-content" >
                    <div className="post-content-header" style={{display:"flex"}}>
                      <img src={post.postedBy?.Photos ? post.postedBy.Photos : defaultProfile} alt="Profile" className="post-author-pic" />
                      <h5 style={{marginTop:"-0.1px ",    marginLeft: "7px",fontSize: "15px"}}>{post.postedBy?.name || "Unknown User"}</h5>
                    
                    </div>
                    <p className="post-caption">{post.body}</p>
                    <div className="post-interactions">
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
                        <span className="post-likes" style={{color:"black"}}>{post.likes?.length || 0} </span>
                      </button>
                      <button className="comment-btn" >
                        <i className="fas fa-comment"></i>
                      </button>
                      <button className="share-btn" onClick={() => showComment(post)} style={{fontsize:"12px"}}>
                        View Comments
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {closeComment && (
        <div className="showComment">
          <div className="container">
            <div className="postPic" style={{ width: "1200px" }}>
              <img src={item.photo} alt="No Pic" />
            </div>
            <div className="details">
              <div
                className="card-header"
                style={{ borderBottom: "1px solid #00000029" }}
              >
                <div className="card-pic">
                  <img src={item?.postedBy?.Photos ? item.postedBy.Photos : defaultProfile} alt="Profile" />
                </div>
                <h5>{item.postedBy?.name || "Unknown User"}</h5>
                <span className="like-badge">{item.likes?.length || 0} Likes</span>
              </div>
              <div className="comment-section-wrapper">
                {Array.isArray(item.comments) &&
                  item.comments.map((com) => (
                    <div
                      className="comment-section"
                      style={{ borderBottom: "1px solid #00000029" }}
                      key={com._id}
                    >
                      <p className="comm" style={{ color: "black" }}>
                        <span
                          className="commenter"
                          style={{ fontWeight: "bolder" }}
                        >
                          {com.postedBy?.name || "Unknown User"}{" "}
                        </span>
                        <span className="commentText">{com.comment}</span>
                      </p>
                    </div>
                  ))}
              </div>

              <div className="card-content">
                <p>{item.likes?.length || 0} Likes</p>
                <p>{item.body}</p>

                <div className="add-comment">
                  <i className="fa-regular fa-face-smile"></i>
                  <input
                    type="text"
                    placeholder="Add a comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                  />
                  <button
                    className="comment"
                    onClick={() => postComment(comment, item._id)}
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
            <div className="close-comment">
              <i
                className="fa-solid fa-xmark"
                onClick={() => showComment()}
              ></i>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyFollowingPost;

import { useEffect, useState } from "react";
import defaultProfile from "../assets/img/default-profile.jpg";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [comment, setComment] = useState("");
  const [closeComment, setCloseComment] = useState(false);
  const [item, setItem] = useState([]);

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

    fetch("/allpost", {
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
    fetch("/likes", {
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
    fetch("/unlikes", {
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
    fetch("/comment", {
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
    <div>
      {data.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        data.map((post) => (
          <div className="card" key={post._id || Math.random()}>
            {/* Card Header */}
            <div className="card-header">
              <div className="card-pic">
                <img src={post.postedBy?.Photos ? post.postedBy.Photos : defaultProfile} alt="Profile" />
              </div>
              <h5><Link to={`/user/${post.postedBy._id}`}>{post.postedBy?.name || "Unknown User"}</Link></h5>
            </div>

            {/* Post Image */}
            <div className="card-img">
              <img src={post.photo} alt="Post" />
            </div>

            {/* Like Button & Text */}
            <div className="card-content">
              {post.likes.includes(
                JSON.parse(localStorage.getItem("user"))._id
              ) ? (
                <i
                  className="fa-solid fa-heart"
                  style={{ color: "#f21d1dff" }}
                  onClick={() => unlikePost(post._id)}
                ></i>
              ) : (
                <i
                  className="fa-regular fa-heart"
                  onClick={() => likePost(post._id)}
                ></i>
              )}

              <p className="likes">{post.likes.length} Likes</p>
              <p className="caption">{post.body}</p>
              <button
                onClick={() => showComment(post)}
                style={{ width: "180px", background: "none", color: "black" }}
              >
                View All Comment
              </button>
            </div>

            {/* Add Comment */}
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
                onClick={() => postComment(comment, post._id)}
              >
                Post
              </button>
            </div>
          </div>
        ))
      )}
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
                  <img src={girlProfile} alt="Profile" />
                </div>
                <h5>{item.postedBy?.name || "Unknown User"}</h5>
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

export default Home;

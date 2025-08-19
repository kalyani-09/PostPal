import "../css/PostDetails.css"; 
import {useState} from "react";
import girlProfile from "../assets/img/girl-profile.jpg";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";


export default function PostDetails({item, showPost, dontShowPost}){
    const [comment, setComment] = useState("");
    const navigate=useNavigate();


    const  notifyA=(msg)=>toast.success(msg);

    const deletePost=(postId)=>{
       if(window.confirm("Do you really want to delete this Post")){
         fetch(`/delete/${postId}`,{
            "method":"DELETE",
            "headers":{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then((result)=>{
            console.log(result);
            notifyA("Post Deleted Successfully");
            navigate("/home");
        })
       }

    }

   return (
    <>
    {
        item &&  <div className="showComment">
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
                    <i className="fa-solid fa-trash" style={{position:"absolute",top:"10px",right:"10px"}}></i>
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
                      <i className="fa-solid fa-trash" onClick={()=>deletePost(item._id)}></i>
                      <input
                        type="text"
                        placeholder="Add a comment"
                        value={comment}
                        onChange={(event) => setComment(event.target.value)}
                      />
                      <button
                        className="comment"
                        // onClick={() => postComment(comment, item._id)}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
                <div className="close-comment">
                  <i
                    className="fa-solid fa-xmark"
                    onClick={dontShowPost}
                  ></i>
                </div>
              </div>
            </div>
    }
    </>
   )
}

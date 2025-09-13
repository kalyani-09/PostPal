import "../css/PostDetails.css"; 
import {useState} from "react";
// import girlProfile from "../assets/img/girl-profile.jpg";
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
            navigate("/");
        })
       }

    }
      const defaultProfile="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4AAAAY1BMVEX///8AAAD8/PyMjIwEBASbm5v5+fns7OzOzs48PDwqKirz8/NfX1+3t7fT09MeHh6+vr4RERFxcXEkJCTm5uaAgIBra2s1NTVCQkKpqamjo6PZ2dl5eXmGhoaSkpJPT09XV1fukoBLAAAD60lEQVR4nO2b63aiMBCAk2wgKBdRIqKi9f2fchPAs2zkEg+YjLvz/arFtl/nTCa3kRAEQRAEQRAEQRAEQRAEWQhj7O8X/ddwMUT1S38y76G9mYzyNM0jqa2/xZ2J9HCiHac6Fd+grYKbBRX9iyq4fkHMxX1DX9jcBfQRmiWv2pok8202Tbod9qZ0m/p2G0OnwnlMm3JKzwRmuiinVAnyUXeaEpBDlJFsNE/amG8zeOJaSDyajJgwfwgCLeh6rrxPxbvlDq2e65VUdpqMdxPyUwZtgDId8BlvbQ4v5EQOTJivbCQ48dTGW5dEWOKElHbipW9Pk7CwE9+Fvk0NpJ03pVffpga5rXju29RgfHllcPZtahDYige+TQ2+VvwyP2+2XIAVcsv5p1mUgyKzFYe294z3dt772LepyY+d+I9vTwNmW1YCYGOTsOv0RlmjnvMrMHHG4np6x0mbx3UIawOkcyXfz5irh/ucAFsdqjjGh/kMP8TAtpwNUTEX8SLy7TjM7AoR2sqwRaXAcdr7CO00qKVLc05fxyjnulLCTPAWUbeeQ/GuhW+7cVTM7wMBb7jHIPOkQ6nl1YA3r3KY+d1HXB6d+vM/4I8L4DTpIdO6dx63qVPp28gOlRKxzINj8ngkxyCXMfws6TCLHtgiiCD/I023ByNfU1D+AVgsFPE3BJx1ecH07FMmav5RM1BS6jmI9Z/DQ5uJvK4K41RrX1R1LqB666YxmZa7se3PrkwlzH64sGtp4kML8uY7VZCBOpxoG/Si4+lF94XTMQLUE6c15K3or8AHaR4WN0mgJLvasJ11p8rc0WH3ju0ZzCbuWrZSfFqdN29RX5QA7joZY+F4A9kY2zRknuuLSpNgN3tMa0Re1cbAc7qwMKzpm97t2+sw9Giu4l3Nao5QeYx5SORIX6cNifR3Vi4tjsTHOXg7tWhvT95M8Jbmx2ofV4eqnLHbknhrbsx9VewaUpdocy9Nq4xcR1ew9uw83B4Ky+6xaUrh1Fwn5mVRmjzhFzWJOVPXQyraLkvwzptuI4dni3plVVusYi3Eub5rdjYPqQhFy6WfRA6znJEFU71J4k5clcL1vHULpbuQr1IKnzhst80sG2ntKFy1aTFi8aGCd7i7yhWx4tDUJK4uE/Ni4fKqj/pFhZNGYab7xtaYfHrmgZvJMz6sK851X4ULrlYf43iHjYsTonDN6b6Bu5n2mX2Puz1OWpyXbzVfubkYm+HKVVyTuFjZxhYH+O+ycVFW5AqbZJOdi7OhVZe0T75W/POFfNVd2x8+X8jV7uf2a3VuDo5XPvMHHOz0P3NLCfHGGUEQBEEQBEEQBEEQBEHW4DfUGym9NOGkBQAAAABJRU5ErkJggg=="
     const user =JSON.parse(localStorage.getItem("user"));
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
                      <img src={user?.Photos ? user.Photos : defaultProfile} alt="Profile" />
                    </div>
                    <h5>{user?.name ? user.name : "Unknown User"}</h5>
                    {/* <i className="fa-solid fa-trash" style={{position:"absolute",top:"10px",right:"10px"}}></i> */}
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
                              {com.postedBy?.name ? com.postedBy.name : "Unknown User"}{" "}
                              {/* {
                                console.log(com.postedBy.name,"nameless")
                              } */}
                            </span>
                            <span className="commentText">{com.comment}</span>
                          </p>
                        </div>
                      ))}
                  </div>
    
                  <div className="card-content" style={{position:"absolute",bottom:"0px",borderTop: "1px solid #00000029", width:"455px"}}>
                     <p>{item.likes?.length || 0} <i className="fa-solid fa-heart" style={{color: "#e70808"}}></i></p>
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

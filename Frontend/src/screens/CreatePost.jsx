import "../css/CreatePost.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SuggestCaptions from "../components/SuggestCaptions";

function CreatePost() {
  const navigate = useNavigate();
  const [body, setBody] = useState("");
  const [image, setImage] = useState(null);   // store the file
  const [previewUrl, setPreviewUrl] = useState(null); // store preview URL
  const [url, setUrl] = useState("");
const API = import.meta.env.VITE_API_BASE_URL;


  const defaultProfile =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALgAAACUCAMAAAAXgxO4...";

  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch(`${API}/createPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
        body: JSON.stringify({
          body,
          image: url,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            notifyA(data.error);
            navigate("/");
          } else {
            notifyB("Successfully posted");
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [url]);

  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "Insta-Clone");
    data.append("cloud_name", "dka4rc69j");

    fetch("https://api.cloudinary.com/v1_1/dka4rc69j/image/upload", {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUrl(data.url);
      })
      .catch((error) => console.log(error));
  };

  // handle file upload + preview
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  }

  return (
    <div className="createPost-container">
      <div className="createPost-wrapper">
        <div className="create-post-body">
          {!image ? (
            <div className="upload-container">
              <div className="upload-box">
                <div className="upload-icon">
                  <i className="fa-solid fa-cloud-arrow-up"></i>
                </div>
                <h2>Upload your photo</h2>
                <p>Drag and drop your photo here or click to browse</p>
                <label htmlFor="file-upload" className="upload-btn">
                  <i className="fa-solid fa-folder-open"></i>
                  Browse Files
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <div className="upload-info">
                  <small>Supported formats: JPG, PNG, GIF (Max size: 10MB)</small>
                </div>
              </div>
            </div>
          ) : (
            <div className="post-editor">
              <div className="editor-left">
                <div className="image-preview-box">
                  {previewUrl && <img src={previewUrl} alt="Preview" />}
                  <div className="image-actions">
                    <button
                      className="action-btn"
                      onClick={() => {
                        setImage(null);
                        setUrl("");
                        setPreviewUrl(null);
                      }}
                    >
                      <i className="fa-solid fa-rotate-left"></i>
                      Change Photo
                    </button>
                  </div>
                </div>
              </div>

              <div className="editor-right">
                <div className="editor-header">
                  {/* <div className="user-profile">
                    <img
                      src={defaultProfile}
                      alt="Profile"
                      className="profile-img"
                    />
                    <div className="profile-info">
                      <h4>
                        {localStorage.getItem("user")
                          ? JSON.parse(localStorage.getItem("user")).name
                          : "Unknown User"}
                      </h4>
                      <span>Posting publicly</span>
                    </div>
                  </div> */}
                </div>

                <div className="caption-section">
                  <textarea
                    value={body}
                    onChange={(event) => setBody(event.target.value)}
                    placeholder="Write a caption for your post..."
                    className="caption-textarea"
                    maxLength="2200"
                  ></textarea>
                  <div className="caption-footer">
                    <span className="char-count">{body.length}/2200</span>
                  </div>
                </div>

                <div className="suggestions-section">
                  <SuggestCaptions />
                </div>

                {/* <div className="post-options">
                  <div className="option-item">
                    <i className="fa-solid fa-location-dot"></i>
                    <input
                      type="text"
                      placeholder="Add location"
                      className="location-input"
                    />
                  </div>
                  <div className="option-item">
                    <i className="fa-solid fa-user-tag"></i>
                    <input
                      type="text"
                      placeholder="Tag people"
                      className="tag-input"
                    />
                  </div>
                </div> */}

                <div className="submit-section">
                  <button className="cancel-btn" onClick={() => navigate(-1)}>
                    Cancel
                  </button>
                  <button
                    className="share-btn"
                    onClick={postDetails}
                    disabled={!image || !body}
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    Share Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreatePost;

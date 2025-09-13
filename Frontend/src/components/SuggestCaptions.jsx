import { useState } from "react";

function SuggestCaptions() {
  const [file, setFile] = useState(null);
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/suggest-captions", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.suggestions) {
        setCaptions(data.suggestions);
      } else {
        setCaptions(["No captions generated"]);
      }
    } catch (err) {
      console.error("Error generating captions:", err);
      setCaptions(["Something went wrong"]);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", marginTop: "20px" }}>
     <div style={{display:"flex",alignContent:"center",gap:"10px",marginBottom:"20px"}}>
       <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={!file || loading} style={{ background: "linear-gradient(135deg, #667eea, #764ba2)",
    /* background: #e9ecef; */
    color:" #e9ecef",
    border: "none",
    padding: "5px 5px",
    borderRadius: "30px",
    fontSize: "16px",
    cursor: "pointer" }}>
        {loading ? "Generating..." : "Generate Captions"}
      </button>
     </div>

      {captions.length > 0 && (
        <div style={{
          border: "1px solid rgba(0,0,0,.1)", borderRadius: "10px"}}>
          <h3>Suggested Captions:</h3>
          {captions.map((cap, i) => (
            <p key={i}>👉 {cap}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default SuggestCaptions;

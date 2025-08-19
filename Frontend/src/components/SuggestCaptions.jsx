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
    <div style={{ padding: "20px" , marginTop:"20px" , borderTop:"2px  solid black"}}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={handleUpload} disabled={!file || loading} style={{width:"150px"}}>
        {loading ? "Generating..." : "Generate Captions"}
      </button>

      {captions.length > 0 && (
        <div>
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

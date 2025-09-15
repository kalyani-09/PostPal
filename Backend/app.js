//Server created by using Node.js


// const http=require('http');
// const server=http.createServer((req,res)=>{
//     console.log("Server Listen on port 5000");
//     res.end("Working");
// });
// server.listen(5000,"localhost",()=>{
//   console.log("Server is running")
// });


//Server Created by using Express.js

const express=require("express");
const app=express();
const port=process.env.PORT || 5000;
const data=require("./data.js")
const cors=require("cors");
const mongoose=require("mongoose");
const {mongoUrl} =require("./key");
const path =require("path");


 

require("./models/model");
require("./models/post.js");

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to Insta-Clone Database"))
.catch((err) => console.error("❌ Failed to connect:", err));

app.use(cors(
   {
  origin: ["https://postpal-11-frontend.onrender.com"], // add your frontend URLs
  // origin: ["http://localhost:5173"],
  credentials: true
   }
));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(require("./routes/auth.js"));
app.use(require("./routes/createPost.js"));
app.use(require("./routes/user.js"));
app.use(require("./routes/suggestCaption.js"));

// app.get("/",(req,res)=>{
//     res.send("Working");
// });
// app.get("/data",(req,res)=>{
//     res.send(data)
// });


//Serving Frontend
// app.use(express.static(path.join(__dirname,"../Frontend/dist")));
// app.get("/{*splat}",(req,res)=>{
//     res.sendFile(
//         path.join(__dirname,"../Frontend/dist/index.html")
//     ),
//     function(err){
//          res.status(500).send(err);
//     }
// })
// app.get("*",(req,res)=>{
//     res.sendFile(
//         path.join(__dirname,"./Frontend/dist/index.html")
//     ),
//     function(err){
//          res.status(500).send(err);
//     }
// })


app.listen(port,"0.0.0.0",()=>{
   
    console.log(`Server is running on ${port}`);
})

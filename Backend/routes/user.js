const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const USER = mongoose.model("User");
const POST = mongoose.model("POST");
const requireLogin = require("../middlewares/requireLogin");




router.get("/user/:userid", requireLogin, async (req, res) => {
    try {
        console.log(req.params.userid);
        const user = await USER.findOne({ _id: req.params.userid });
        if (!user) {
            return res.status(422).json({ error: "User not Found" });
        }
        const post = await POST.find({ postedBy: req.params.userid }).populate("postedBy","_id name Photos").populate("comments.postedBy","_id name ");
        if (!post) {
            return res.status(422).json({ error: "Post Not Found" })
        } else {
            return res.status(200).json({ post, user });
        }
    }catch(err){
         console.log(err);
         
         } 

});



router.put("/follow", requireLogin, async (req,res)=>{

   try{
     const followedUser=await  USER.findByIdAndUpdate(req.body.followid,{
        $push:{followers:req.user._id}
    },{
            new:true,
        })
        if(!followedUser){
            return res.status(422).json({error:"User Not Found"});
        }
        


        const currentUser =await USER.findByIdAndUpdate(req.user._id,{
            $push:{following:req.body.followid}
        },{
            new:true,
        })
        if(!currentUser){
             return res.status(422).json({error:"User Not FOund"});
        }

        return res.status(200).json({message:"You started following "});
  
   }catch(error){
    console.log(error)
   }
        
});

router.put("/unfollow", requireLogin, async (req,res)=>{

   try{
     const followedUser=await  USER.findByIdAndUpdate(req.body.followid,{
        $pull:{followers:req.user._id}
    },{
            new:true,
        })
        if(!followedUser){
            return res.status(422).json({error:"User Not Found"});
        }
        else{
            console.log(followedUser._id);
        }
        


        const currentUser =await USER.findByIdAndUpdate(req.user._id,{
            $pull:{following:req.body.followid}
        },{
            new:true,
        })
        if(!currentUser){
             return res.status(422).json({error:"User Not FOund"});
        }
        else{
            console.log(currentUser._id);
        }

        return res.status(200).json("You dont folllow")
  
   }catch(error){
    console.log(error);
    res.status(500).json({error:"Something went wrong"});
   }
        
});

router.get("/myfollowingpost",requireLogin, async (req,res)=>{
    const post=await POST.find({postedBy:{$in:req.user.following}}).populate("postedBy","_id name").populate("comments.postedBy","_id name")
    if(!post){
        return res.status(422).json({error:"Post Not Found"});
    }
    return res.status(200).json(post);
});

router.put("/uploadProfilePic",requireLogin,async (req,res)=>{
    const response=await USER.findByIdAndUpdate(req.user._id,{
        $set:{Photos:req.body.image}},
        {new:true},
    )
    
    if(!response){
        return res.status(422).json({error:"Something went wrong"});
    }
    return res.status(200).json({message:"Profile Pic Updated"})
})


module.exports = router;
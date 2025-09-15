const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const POST = mongoose.model("POST");
const requireLogin = require("../middlewares/requireLogin");


router.get("/allpost", requireLogin, (req, res) => {
    POST.find()
        .populate("postedBy", "_id name Photos").populate("comments.postedBy","_id name ")
        .sort("-createdAt")
        .then(posts => {
            res.json(posts);
            console.log(posts)
        })
        .catch(error => console.log(error));
});

router.post("/createPost", requireLogin, (req, res) => {
    const { body, image } = req.body;

    if (!body || !image) {
        return res.status(402).json({ error: "All the fields are required" });
    }
    console.log(req.user);
    const post = new POST({

        body,
        photo: image,
        postedBy: req.user
    })
    post.save().then((result) => {
        return res.json({ post: result });
    }).catch((error) => console.log(error));

});


router.get("/mypost", requireLogin, (req, res) => {
    POST.find({ postedBy: req.user._id })
         .populate("postedBy","_id name photos").populate("comments.postedBy","_id name ")
        .then(mypost => {
            res.json(mypost);
            // console.log(mypost);
        })
        .catch(error => console.log(error));
});


router.put("/likes", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name")
        .then(result => {
            res.json(result);
            console.log(result);
        })
        .catch(error => console.log(error));
});


router.put("/unlikes", requireLogin, (req, res) => {
    console.log(req.body);
    POST.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).populate("postedBy", "_id name")
        .then(result => {
            res.json(result);
            console.log(result)

        })
        .catch(error => console.log(error));
});

router.put("/comment", requireLogin, (req, res) => {
    const comment = {
        comment: req.body.comment,   // take comment text from request
        postedBy: req.user._id       // always use logged-in user (secure)
    };

    POST.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment } },
        { new: true }
    )
        .populate("postedBy", "_id name")               // post creator
        .populate("comments.postedBy", "_id name")      // each commenter
        .then(result => {
            if (!result) {
                return res.status(404).json({ error: "Post not found" });
            }
            res.json(result);
        })
        .catch(error => {
            console.error(error);
            res.status(422).json({ error: "Something went wrong" });
        });
});


router.delete("/delete/:postId", requireLogin, async (req, res) => {
   try{
     const post = await POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")

    if (!post) {
        return res.status(422).json({ error: "Post Not Found" })
    }

    if (((post.postedBy._id).toString()) == ((req.user._id).toString())) {
        await post.deleteOne();
        return res.status(200).json({ message: "Successfully Deleted" })
    }
    else {
        return res.status(422).json({ error: "You are not the onwer of this post" });
    }
   }

catch(err){
  console.log(err);
}
}
);




module.exports = router;

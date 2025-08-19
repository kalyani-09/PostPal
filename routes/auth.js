const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const user = require("../models/model.js");
const mongoose = require("mongoose");
const USER = mongoose.model("User");
const { JWT_Secret } = require("../key.js");
const JWT = require("jsonwebtoken");
const requireLogin = require("../middlewares/requireLogin.js");


// router.get("/", (req, res) => {
//     res.send("hello ....Kalyani Here!!!")
// });

router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            console.log("All feilds are required");
            res.status(422).json({ error: "All fields are required" })
        }

        const savedUser = await USER.findOne({
            $or: [{ email: email }, { name: name }],
        });

        if (savedUser) {
            console.log("User already Exists");
            return res.status(422).json({ error: "User Already exists " });
        }
        const hashedPass = await bcrypt.hash(password, 10);
        const newUser = new USER({
            name,
            email,
            password: hashedPass
        })
        await newUser.save()
        console.log("Saved Successfully")
        return res.status(200).json({ message: "Saved Successfully" });

    } catch (err) {
        console.log(err);
        return res.status(422).send({ error: "Something went wrong" })
    }

});

router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "Enter all fields" });
    }
    const foundUser = await USER.findOne({ email: email });
    if (!foundUser) {
        return res.status(422).json({ error: "Invalid Email" });
    } else {
        bcrypt.compare(password, foundUser.password).
            then((match) => {
                // console.log("SignIn Successfully");
                // return

                const token = JWT.sign({ _id: foundUser._id }, JWT_Secret);
                const { _id, name, email } = foundUser;

                console.log(token, { user: { _id, name, email} });

                return res.json({
                    token: token,
                    user: { _id, name, email }
                });

            });
    }
});

router.get("/createPost", requireLogin, (req, res) => {
    console.log("Auth.js");
});

module.exports = router;
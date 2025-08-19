const JWT = require("jsonwebtoken");
const { JWT_Secret } = require("../key.js");
const mongoose = require("mongoose");
const USER = mongoose.model("User");


module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in (no token)" });
    }

    const token = authorization.replace("Bearer ", "");

    JWT.verify(token, JWT_Secret, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in (invalid token)" });
        }

        const { _id } = payload;

        USER.findById(_id)
            .then((userData) => {
                if (!userData) {
                    return res.status(401).json({ error: "User not found" });
                }
                req.user = userData;
                next();
            })
            .catch(() => {
                return res.status(500).json({ error: "Server error" });
            });
    });
};

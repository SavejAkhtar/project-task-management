const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

    let token = req.headers.authorization;

    if (!token) {
        return res.send({status: 0,msg: "Token required"});
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {

        if (err) {
            return res.send({status: 0,msg: "Invalid or expired token"});
        }

    req.user = decoded;

        next();
    });
};

module.exports =authMiddleware;
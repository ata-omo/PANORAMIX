const jwt = require("jsonwebtoken");


const verify = (req, res, next) => {
    const authHeader = req.headers.token;


    if (authHeader) {
        // const tokenHead = authHeader.split(" ");
        // const token= tokenHead[1];
        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.SECRET_KEY, (err, userInfo) => {
            if (err) res.status(403).json("Invalid token!!");

            req.user = userInfo; // if error is not encountered

            next();// next() passes control to the next middleware or the route handler in the middleware chain once the execution of the current middleware is completed.
        })
    }
    else {
        return res.status(401).json("authentication failed!!");
    }
}


module.exports = verify;
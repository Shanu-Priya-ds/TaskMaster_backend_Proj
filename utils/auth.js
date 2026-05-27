const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const expiration = '2h';

authMiddleware = (req, res, next) => {
    let token = req.body?.token || req.query?.token || req.param?.token;
    if (req.headers?.authorization) {
        token = token.split(" ").pop().trim();
    }
    if (!token) {
        return res.status(401).json({ message: 'You must be logged in to do that.' });
    }
    try {
        const { data } = jwt.verify(token, secret, { maxAge: expiration });
        req.user(data);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "invalid token" })
    }
}
signToken = (user) => {
    const payload = { username: user.username, email: user.email, _id: user._id };
    return jwt.sign(payload, secret, { expiresIn: '2h' });
}

module.exports = { signToken }
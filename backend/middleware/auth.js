const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(403).json({ message: "No token provided!" });

    const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
    if (!token) return res.status(403).json({ message: "No token provided!" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
};

module.exports = verifyToken;

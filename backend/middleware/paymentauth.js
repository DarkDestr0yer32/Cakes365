import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {
    const { token } = req.headers;
    if (!token) {
        return res.json({ success: false, message: "Not authorized, login again" });
    }
    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id; // Ensure userId is attached to req.body
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.json({ success: false, message: "Error" });
    }
};

export default authMiddleware;

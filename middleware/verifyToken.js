import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]
        if(!token) return res.status(401).json({message:"User unauthorized"})
    
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    
            if(!decoded) return res.jsaon({message:"Something happened..."});
    
            req.user = decoded;
            next();
    } catch (error) {
        console.log(error)
        res.json({error:error.message})
    }
}
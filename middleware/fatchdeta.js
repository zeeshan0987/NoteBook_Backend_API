var jwt = require('jsonwebtoken');
const JWT_SECRET="zeeshankesite";

const fetchdeta =(req ,res,next)=>{
    //Get the user from the jwt token and add id to req object
    const token = req.header('auth-tocken');
    if (!token) {
        res.status(401).send({error:"Please authenticate user a valid token"})
    }
    try {
        const deta =jwt.verify(token,JWT_SECRET);
        req.user = deta;
        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate user a valid token"})
        
    }
    
}

module.exports = fetchdeta;
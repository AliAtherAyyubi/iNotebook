
        // using JWT token user will be fetched from database by using user id ////

let jwt= require('jsonwebtoken')
const JWT_Secret="proCode"

const fetchuser= (req,res,next)=>{
    const token= req.header('auth-token')
    if(!token){
       return res.status(400).send({error:"Please authonticate using a valild token"});
    }
    try {
        let data= jwt.verify(token,JWT_Secret)
        req.user=data;
        next();
    } catch (error) {
       return res.status(400).json({error:error.message})
    }
}

module.exports= fetchuser
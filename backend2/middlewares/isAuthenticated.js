
// middleware req aur response ke bich mai kam karta hai
// eg apko plane mai baithan hai
// pahle apke documents check honge phir aapko age bheja jayega (yahi kam middleware karta hai)
// ye sahi hua to phir age leke jayega apko response de dega

import jwt from "jsonwebtoken";

const isAuthenticated=async(req,res,next)=>{
    try{
        const token=req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"User not authenticated",
                success:false,
            })
        }

        // if your token  contains this 
        // const payload = { userId: "abc123", role: "admin" };
        // const token = jwt.sign(payload, process.env.SECRET_KEY);
        // then decode contains  { userId: "abc123", role: "admin" };
       
        const decode=await jwt.verify(token,process.env.SECRET_KEY)
        
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };

        

        req.id=decode.userId;

        next();  // 👈 this calls the next middleware or route . for this it calling updateprofile function according to our route
    }
    catch(error){
        console.log(error); 
    }
}
export default isAuthenticated;
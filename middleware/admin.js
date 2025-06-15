const {Admin}=require("../db");
const {jwt_pass} =require("../config");
const jwt =require("jsonwebtoken");
function adminmiddlewear(req,res,next){
    const token = req.headers.authorization;
    const words= token.split(" ");// this converts teh token into array whenever it encounter space
    const jwtToken =words[1];
const decodedvalue=jwt.verify(jwtToken,jwt_pass);   
if(decodedvalue.username){
    next();
}else{
    res.json({
        msg:"you are ot authenticated"
    })
}


}
module.exports= adminmiddlewear;

const express = require("express");
const {User ,Course} =require("../db");
const router= express.Router();
const usermiddlewear =require("../middleware/user");
const {jwt_pass} = require("../config");
router.post("/signup",async(req,res)=>{
    const username= req.body.username;
    const password=req.body.password;
  await  User.create({
        username,password
    })
    res.json({
        message:"user created successfully"
    })

})
router.post("/signin",async(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
const user= await User.find({
    username,password
})
if(user){
    const token= jwt.sign({
        username
    },jwt_pass);
    res.json({token});
}else{
    res.json({
        message:"incorrect mail and pass"
    })
}

})
router.get('/courses', async (req, res) => {
    // Implement listing all courses logic
     // Implement fetching all courses logic
     const response = await Course.find({});

     res.json({
         courses: response
     })
});
router.post("/courses/:courseId",usermiddlewear,async(req,res)=>{
    const courseId= req.params.courseId;
    const username=req.headers.username;
    await User.updateOne({
username:username
    },{
        "$push":{
            purchasedCourses:courseId
        }
    })

})
router.get("/purchasedCourses",usermiddlewear,async(req,res)=>{
        const username= req.headers.username;
        const user = await User.findOne({
            username
        })
 const courses = await Course.find(
    {_id:{
    "$in":user.purchasedCourses
 }})
 res.json({
    courses:courses
 })
});
module.exports=router;

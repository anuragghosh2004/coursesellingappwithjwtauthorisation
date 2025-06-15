const express= require("express");
const router= express.Router();
const adminMiddlewear = require("../middleware/admin");
const {Admin,Course}= require("../db");
const jwt= require("jsonwebtoken");
const {jwt_pass} = require("../config");
router.post('/signup',async(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    await Admin.create({
        username,password
    })
    res.json({
        message:"Admin cerated successfully"
    })

})
router.post('/courses', adminMiddlewear, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    // zod
    const newCourse = await Course.create({
        title,
        description,
        imageLink,
        price
    })

    res.json({
        message: 'Course created successfully', courseId: newCourse._id
    })
});
router.post("/signin",async(req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
const user= await Admin.find({
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

router.get('/courses', adminMiddlewear, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Course.find({});

    res.json({
        courses: response
    })

});
module.exports=router;
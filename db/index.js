const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://anuragghosh:<your password>@cluster0.tnzmmms.mongodb.net/course_selling_app");

const AdminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    purchasedCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});

const CourseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String
});

const Admin = mongoose.model('admin', AdminSchema);
const User = mongoose.model('user', UserSchema);
const Course = mongoose.model('course', CourseSchema);

module.exports = { Admin, User, Course };

const User= require("../models/user.models")
const bcrypt= require("bcryptjs")
const jwt=require("jsonwebtoken")


exports.register=async (req,res)=>{
    const {name, email, password}=req.body

    const existingUser=await User.findOne({email})
    if(existingUser){
        return res.status(400).json({
            message:"Email already exist"
        })
    }
    const hashedPassword= await bcrypt.hash(password,10)

    const user= await User.create({
        name,
        email,
        password:hashedPassword
    })
    const userResponse = {
            id: user._id,
            name: user.name,
            email: user.email
        };

        res.status(201).json({
            message: "User registered successfully",
            user: userResponse
        });
    res.json(user);
};

exports.login=async(req,res)=>{
    const {email,password}=req.body

    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User not found"
        })
    }
    const isMatch= await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"Invalid Credential"
        })
    }

    const token= jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:"1d"})
    res.json({token})

};
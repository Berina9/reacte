const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt =require("jsonwebtoken")
const createUser=async(req,res)=>{
    try{
const {username,email,password}=req.body;
const newPassword=await bcrypt.hash(password,10);

await User.create({
    username,
    email,
    password:newPassword
});
return res.status(201).json({
    message:"user created succesfully"
})
    }catch(error){
        console.error(error);
       return res.sataus(500).json({
        message:"user failed to create"
       });
    }
};

const loginUser=async(req,res)=>{
    const{email,password}=req.body;

    console.log(email);

    const user=await User.findOne({email});
        if (!user) 
    return res.status(400).json({
message:"user not found"
});
    const isPasswordCorrect=await bcrypt.compare(password,user.password);

    if(isPasswordCorrect){
        const access_token =jwt.sign({
            id:user.id,
            email:user.email
        },
        process.env.SECRET_KEY
        )
        return res.status(200).json({
        message:"login successful",
    access_token:access_token   
    });
    }
    return res.status(404).json({
    message:"user credentials are not correct"
    });
};

module.exports={createUser,loginUser};
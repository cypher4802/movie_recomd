const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// SIGNUP
exports.signup = async( request,response)=>{
    try{
        const {name,password,email}= request.body;

        // Check mail if alreadytaken or not
        const existingUser =await User.findOne({email});
        if (existingUser){
            return response.status(400).json({error:'email is already taken'})
        }

        // Password hashing
        const password_hash= await bcrypt.hash(password,10);

        // Creating new user
        const newUser =new User({
            name,
            password_hash,
            email,
            // profilePiture,
        });

        // Save data to db
        const savedUser = await newUser.save();

        console.log('JWT_SECRET:', `111`);

        // Generating JWS token
        const token = jwt.sign({userId: savedUser._id},`111`,{expiresIn: '1h'});

        // Returning token
        response.json({token , User:savedUser});
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Failed to signup'});

    }
};


// USER LOGIN
exports.login = async(req,res) =>{
    try{
        const {email,password}=req.body;

        // checking correct email
        console.log('Type of password:', typeof password);
        // console.log('Type of hashedPassword:', typeof user.password);


        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({error:'Invalid email'})
        }

        // Checking password
        const passwordMatch = await bcrypt.compare(password,user.password_hash)
        if (!passwordMatch){
            return res.status(401).json({error:'Wrong password'});
        }

        // Generating token
        console.log('JWT_SECRET:', '111');
        const token = jwt.sign({ userId: user._id },'111', { expiresIn: '1h' })
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        res.json({ token, user });
    }catch(error){
        console.error(error);
        res.status(500).json({error:'Failed to login'});
    }
};
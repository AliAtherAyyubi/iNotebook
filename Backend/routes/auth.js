
let express= require('express')
let router= express.Router();
const User=require('../models/User');
let {body,validationResult}=require('express-validator');
// const user = require('../models/User');
const JWT_Secret="proCode"
let success=false;
// to convert password into hash avoid from hacking using bcrypt library //

const bcrypt= require('bcryptjs')

// to send user a web token to authenticate user //

const jwt=require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');


router.post('/createuser',[
    body('name','Please enter correct name!').isLength({min:3}),
    body('email','Please enter a valid email').isEmail(),
    body('password','Enter password atleast of 4 digits').isLength({min:4})], 
    
    async(req,res)=> {

    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.send({errors:errors.array()})
    }
    try {

        const userPassword=req.body.password;
        let salt= await bcrypt.genSalt(10)
        const hashPassword= await bcrypt.hash(userPassword,salt)

        
            // checking duplicate user //
        var user=await User.findOne({email: req.body.email});
        if(user){
            success=false
            return res.json({success,message:'User is already exist with this email!'})
        }
        else{
            User.create({
                name:req.body.name,
                email:req.body.email,
                mobile:req.body.mobile,
                address:req.body.address,
                password:hashPassword,
            });
            success=true
            return res.json({success,message:'Registered Successfully!'})
            
        }
        // console.log(authtoken)
    } catch (error) {
        res.status(400).json({error:error.message});
    }
    
});

        // login request by user.//
router.post('/login',[
    body('email','Please enter a valid email').isEmail()],
    async(req,res)=> {
            // main code //
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.send({errors:errors.array()})
    }

            // checking user credentials //
    try {

        // let email=req.body.email;
        // let userPassword=req.body.password;
        const {email}= req.body;
        // let salt= await bcrypt.genSalt(10)
        const user= await User.findOne({email});
        
        // var comparePass= checkEmail.password;
        
        if(!user){
            success=false;
        return res.json({success,message:"User doesn't exist with this Email!"});

        }
        // console.log(user.password)

                // comparing password //
        const comparePass=await bcrypt.compare(req.body.password,user.password)
        // console.log(comparePass)
        if(!comparePass){
            success=false
        return res.json({success,message:"Invalid Password"});

        }
        else{
            let payload={
                id:user.id
            }
            // console.log(payload)
            const authtoken= jwt.sign(payload,JWT_Secret)
            success=true;
            return res.json({success,message:"Login Attempted!",authtoken})
        }
        // console.log(authtoken)
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.get('/getuser',fetchuser, async(req,res)=>{
    try {
    let userId=req.user.id;
    // console.log(userId)
    const user= await User.findById(userId).select("-password");
    return res.json(user)
        
    } catch (error) {
        res.status(500).json({error:error.message});
        
    }    
})

        // api call to update user details //
router.post('/updateuser',fetchuser, async(req,res)=>{
        try {
            var {name,email,mobile,address}=req.body;
            let userId=req.user.id;
            const user= await User.findOneAndUpdate({_id:userId},{name,email,mobile,address});
            return res.json(user)
                
            } catch (error) {
                res.status(500).json({error:error.message});
            }    
        })
module.exports=router
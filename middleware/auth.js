const jwt=require("jsonwebtoken");
require('dotenv').config()
const reg=require("../models/user");
var a;
const auth=async(req,res,next)=>
{
    try
    {
        const token = req.header('Authorization');
        const t = token.split(" ");
        const verify=jwt.verify(t[1],process.env.SECRET_KEY);
        a= await reg.findOne({_id:verify._id});
        module.exports.user23=a
        next();
    }
    catch(error)
    {
       res.status(400).send(error);
    }
}
module.exports=auth

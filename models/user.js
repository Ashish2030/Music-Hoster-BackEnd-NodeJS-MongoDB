const Product = require('./product');
const mongoose=require("mongoose");
const validator=require("validator");
const jwt=require('jsonwebtoken')

require('dotenv').config()
const User1=new mongoose.Schema({
    userName:{
        type:String,
         required:true,
        minlength:3
    },
    password:{
        type:String,
        required:true,
        minlength:3
    },
    firstname:{
        type:String,
        required:true,
        minlength:3
    },
    lastname:{
        type:String,
        required:true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
        unique:[true,"Email id already present"],
        validate(value)
        {
            if(!validator.isEmail(value))
            {
                throw new Error("Invalid");
            }
        }
    },
    mobile:{
        type:Number,
        min:10
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ]
});

User1.methods.generateAuthToken=async function()
{
    try
    {
        const token=jwt.sign({_id:this._id.toString()},process.env.SECRET_KEY);

        return token;
    }
    catch(error)
    {
        console.log(error); 
    }
}
const User=new mongoose.model("User",User1);

module.exports=User;
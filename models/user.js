const mongoose=require("mongoose");
const validator=require("validator");
const User1=new mongoose.Schema({
    username:{
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
    }
})
const User=new mongoose.model("User",User1);
module.exports=User;
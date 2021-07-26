
const express = require('express');
const app=express();
const router = express.Router();
const User =require("../../models/user");



//login and token generate
router.post("/login",async(req,res)=>
{
    const name=req.body.username;
    const pass=req.body.password;
    try
    {
      const user123=await User.findOne({userName:name})
      if(user123.password==pass)
      {
      const token =await user123.generateAuthToken();
      console.log("Login Done");
      res.status(201).send(token);
      }
      else
      {
        res.status(400).send("Incorrect Password");
      }
    }
    catch(error)
    {
        res.status(400).send(error);
    }
    
})

module.exports = router;
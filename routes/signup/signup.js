const express = require('express');
const app=express();
const router = express.Router();
const User =require("../../models/user");

require("../../db/conn");

//signup
router.post("/signup",async(req,res)=>
{
    try
    {
        const user=new User(req.body);
        await user.save();
        res.status(201).send("User Save");
    }
    catch(error)
    {
        res.status(400).send(error);
    }
    
})

module.exports = router;
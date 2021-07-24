const express=require("express");
const User =require("./models/user");
require("./db/conn");
const app=express();
const port=process.env.PORT || 8000;
app.use(express.json());
app.post("/signup",async(req,res)=>
{
    try
    {
        const user=new User(req.body);
        await user.save();
        res.status(201).send("User Save");
    }
    catch(error)
    {
        res.status(400).send(e);
    }
    
})
app.post("/login",async(req,res)=>
{
    const name=req.body.username;
    const pass=req.body.password;
    try
    {
      const user123=await User.findOne({username:name})
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
app.listen(port,()=>
{
    console.log(`connected at ${port}`);
})
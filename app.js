const express=require("express");
const User =require("./models/user");
require("./db/conn");
const app=express();
const port=process.env.PORT || 8000;
app.use(express.json());
app.post("/signup",(req,res)=>
{
    const user=new User(req.body);
    user.save().then(()=>
    {
        console.log("a");
        res.status(201).send(user);
    }).catch((e)=>
    {
        res.status(400).send(e);
    })
})
app.listen(port,()=>
{
    console.log(`connected at ${port}`);
})
const express=require("express");
const Product = require('./models/product');
const User =require("./models/user");
require("./db/conn");
const auth=require("./middleware/auth");
const app=express();
const port=process.env.PORT || 8000;
app.use(express.json());
console.log(auth.user23);

//signup
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

//login and token generate
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

//upload
app.post("/upload",auth, async(req, res) => {
    try
    {
        const temp=await Product.create(req.body); 
        auth.user23.cart.push(temp);
        await  auth.user23.save();
        res.status(201).send("uploading succesful"); 
    }
    catch(error)
    {
        res.status(201).send("Not upload"); 
    }
  
})

app.listen(port,()=>
{
    console.log(`connected at ${port}`);
})

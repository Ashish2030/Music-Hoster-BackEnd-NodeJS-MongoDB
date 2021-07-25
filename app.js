const express=require("express");
const app=express();
const port=process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended: true}))
const User =require("./models/user");
const Product = require('./models/product');
const auth=require("./middleware/auth");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })
var fs = require('fs');
require("./db/conn");

//signup
app.post("/signup",async(req,res)=>
{
    console.log("p");
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



//uplod trial
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


// delete music file
app.delete('/products/:id',auth, async  (req, res, ) =>{
   
    try
    {
        console.log("p");
        await Product.findByIdAndDelete(req.params.id);
        auth.user23.cart.remove(req.params.id);
        res.status(201).send("delete");
    }
    catch(error)
    {
        res.status(400).send("Not upload"); 
    }
  })


// find all file
app.get('/products', async(req, res) => 
{
    const products = await Product.find({});
    res.status(201).send(products); 
})


// save file to database 
app.post('/products',auth, upload.single('avatar'), async function (req, res, next) 
{
   
    try
    {
        var filePath=req.file.path;
        result = getByteArray(filePath)
        console.log(typeof(result));
        const a={
            "title":req.body.title,
            "imq":result,
            "desc":req.body.desc
        }
        const temp=await Product.create(a); 
        auth.user23.cart.push(temp);
        await  auth.user23.save();
        res.status(201).send("uploading succesful"); 
    }
    catch(error)
    {
        res.status(201).send("Not upload"); 
    }
  })

  
  function getByteArray(filePath){
    let fileData = fs.readFileSync(filePath).toString('hex');
    let result = []
    for (var i = 0; i < fileData.length; i+=2)
      result.push('0x'+fileData[i]+''+fileData[i+1])
    return result;
}


   


app.listen(port,()=>
{
    console.log(`connected at ${port}`);
})

const express = require('express');
const router = express.Router();
const Product = require('./models/product');
var fs = require('fs');
const auth=require("./middleware/auth");
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

//uplod trial
router.post("/upload",auth, async(req, res) => {
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
route.delete('/products/:id',auth, async  (req, res, ) =>{
   
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
router.get('/products', async(req, res) => 
{
    const products = await Product.find({});
    res.status(201).send(products); 
})


// save file to database 
router.post('/products',auth, upload.single('avatar'), async function (req, res, next) 
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
module.exports = router;

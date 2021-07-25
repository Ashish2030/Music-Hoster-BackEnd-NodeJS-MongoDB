const express=require("express");
const app=express();
const port=process.env.PORT || 8000;
app.use(express.json());
app.use(express.urlencoded({extended: true}))





require("./db/conn");
const signupRoutes = require('./routes/signup/signup');
const loginRoutes = require('./routes/login/login');
const ProductRoutes = require('./routes/product/product');
app.use(signupRoutes);
app.use(loginRoutes);
app.use(ProductRoutes);



   


app.listen(port,()=>
{
    console.log(`connected at ${port}`);
})

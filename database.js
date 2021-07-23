const {Client}=require('pg');
const client =new Client({
    host:"localhost",
    port:"5432",
    user:"postgres",
    password:"Chitkara@123",
    database:"musichoster"
})
client.connect();
client.query('select * from user_profile',(err,result)=>
{
    if(!err)
    {
        console.log(result.rows);
    }
    else
    {
        console.log(err); 
    }
    client.end();
})
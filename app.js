const express=require('express');
const bodyParser=require('body-parser');
var cors=require('cors');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const sequelize=require('./util/database');
const Users=require('./models/users');
sequelize.sync().then(result=>{
    //console.log(result)
    app.listen(4000);
}).catch(err=>{console.log(err)});
//sequelize.sync({force:true});

app.post('/users/add-user', async(req,res)=>{
       console.log(req.body);
        const name=req.body.name;
        const email=req.body.email;
        const phone=req.body.phone;
        console.log(name);
        try{  
            //console.log(" str")
        const data=await Users.create({name:name,email:email,phone:phone});
        res.status(201).json({newuserdetail:data});
       } 
       catch(err){
        console.log(err);
        res.status(500).json({
            error:err

        })
    }
       

})

app.get('/users/get-users',async(req,res,next)=>{
    try{
    const users=await Users.findAll();
    res.status(200).json({allusers:users});
    } catch(err){res.status(500).json({error:err})}
})
//导入路由器以及中间件
const express=require('express');
const userRouter=require('./routes/user.js');
const proRouter=require('./routes/product.js');
const bodyParser=require('body-parser');
const cors=require("cors");
const session=require("express-session");
//创建服务器
var app=express();
app.listen(3000);
//使用bodyparser
app.use(bodyParser.urlencoded({extended:false}));
//托管静态文件到public目录下
app.use(express.static('public'));
app.use(cors({
    origin:["http://127.0.0.1:5500","http://localhost:5500"],
	credentials:true //要求客户端必须携带cookie
  }))
  app.use(session({
    secret:"128位随机字符",
    resave:false,
    saveUninitialized:true,
	cookie:{
       maxAge:1000*60*60*24,
    }
  }))
//把用户路由器引用并挂载到/user下
app.use('/user',userRouter);
app.use('/product',proRouter);


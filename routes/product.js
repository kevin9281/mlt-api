//商品路由器
const express=require('express');
//引入mysql连接模块，..表示上一级目录,哪一个模块要操作sql就引用连接模块
const pool=require('../pool.js');
//创建空路由器
var router=express.Router();

//往路由器中添加路由
//详情页加载
router.get('/detail',(req,res)=>{
    var pid=req.query.pid;
    if(!pid){pid=1}
    pool.query('SELECT * FROM PRODUCT WHERE pid=?',[pid],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:1,data:result[0]})
        }
    })
})
//添加购物车
router.get('/addcart',(req,res)=>{
    var uid=req.query.uid;
    var pid=req.query.pid;
    var count=req.query.count;
    pool.query('SELECT * FROM cart WHERE uid=? AND pid=?',[uid,pid],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            var oldcount=result[0].count;
            var newcount=parseInt(oldcount)+parseInt(count);
            pool.query('UPDATE cart SET count=? WHERE uid=? AND pid=?',[newcount,uid,pid],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){res.send({code:1})}else{res.send({code:0})}
            })
        }else{
            pool.query('INSERT INTO cart VALUES(NULL,?,?,?,0)',[uid,pid,count],(err,result)=>{
                if(err)throw err;
                if(result.affectedRows>0){res.send({code:1})}else{res.send({code:0})}
            })
        }
    })
})
//购物车页面加载
router.get('/shoppingcart',(req,res)=>{
    var uid=req.query.uid;
    var sql='SELECT b.title,b.price,a.count,a.pid FROM cart a INNER JOIN product b ON b.pid=a.pid WHERE uid = ?'
    pool.query(sql,[uid],(err,result)=>{
        if(err)throw err;
        if(result.length>0){res.send({code:1,data:result})}else{res.send({code:0})}
    })
})
//购物车数量修改
router.get('/updatecart',(req,res)=>{
    var uid=req.query.uid;
    var pid=req.query.pid;
    var count=req.query.count;
    pool.query('UPDATE cart SET count=? WHERE uid=? AND pid=?',[count,uid,pid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){res.send({code:1})}else{res.send({code:0})}
    })
})
//购物车删除
router.get('/deletecart',(req,res)=>{
    var uid=req.query.uid;
    var pid=req.query.pid;
    pool.query('DELETE FROM cart  WHERE uid=? AND pid=?',[uid,pid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){res.send({code:1})}else{res.send({code:0})}
    })
})
//购物车清空
router.get('/clearcart',(req,res)=>{
    var uid=req.query.uid;
    pool.query('DELETE FROM cart  WHERE uid=?',[uid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows>0){res.send({code:1})}else{res.send({code:0})}
    })
})
//导出路由器
module.exports=router;
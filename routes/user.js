//用户路由器
const express=require('express');
//引入mysql连接模块，..表示上一级目录,哪一个模块要操作sql就引用连接模块
const pool=require('../pool.js');
//创建空路由器
var router=express.Router();

//往路由器中添加路由
 //1注册start
router.post('/reg',(req,res)=>{
  var obj=req.body;
//如果为空，则注册失败，return阻止程序往后进行
  var $uname=obj.uname,$upwd=obj.upwd,$email=obj.email;
  if (!$uname){res.send({code:401,msg:'uname required'});return};
  if (!$upwd){res.send({code:402,msg:'upwd required'});return};
  if (!$email){res.send({code:404,msg:'email required'});return};
//把用户信息插入数据库
  pool.query('INSERT INTO xz_user VALUES(NULL,?,?,?,NULL,NULL,NULL,0)',[$uname,$upwd,$email],(err,result)=>{if(err)throw err;
//判断affectedRows是否大于0（是否插入成功）
    if (result.affectedRows>0){res.send({code:200,msg:'reg succeed'})};
  });
});
//1注册end
//2登录start
router.post('/login',(req,res)=>{
  var obj=req.body,$uname=obj.uname,$upwd=obj.upwd;
//判断是否为空
  if (!$uname){res.send({code:401,msg:'uname required'});return};
  if (!$upwd){res.send({code:402,msg:'upwd required'});return};
//判断用户是否已注册
  pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',[$uname,$upwd],(err,result)=>{if(err)throw err;
    if (result.length>0){req.session.uid=result[0].uid;console.log(req.session.uid);res.send({code:200,msg:'login succeed',uid:result[0].uid})}else{res.send({code:301,msg:'wrong uname or upwd'})}
  });
});
//2登录end
//3删除用户start
router.get('/delete',(req,res)=>{
  var obj=req.query,$uid=obj.uid;
//判断是否填写内容
  if(!$uid){res.send({code:400,msg:'uid required'});return};
//判断是否删除
  pool.query('DELETE FROM xz_user WHERE uid=?',$uid,(err,result)=>{
    if(err)throw err;
	if(result.affectedRows>0){res.send({code:200,msg:'delete succeed'})}else{res.send({code:301,msg:'delete error'})};
	});
});
//3删除用户end
//4用户更改start
router.post('/update',(req,res)=>{
	var obj=req.body,$uid=obj.uid,$email=obj.email,$phone=obj.phone,$user_name=obj.user_name,$gender=obj.gender;
//判断内容
	if(!$uid){res.send({code:400,msg:'uid required'});return};
	if(!$email){res.send({code:401,msg:'email required'});return};
    if(!$phone){res.send({code:402,msg:'phone required'});return};
    if(!$user_name){res.send({code:403,msg:'user_name required'});return};
    if(!$gender){res.send({code:404,msg:'gender required'});return};
//操作并判断是否更改
  pool.query('UPDATE xz_user SET email=?,phone=?,user_name=?,gender=? WHERE uid=?',[$email,$phone,$user_name,$gender,$uid],(err,result)=>{
	if(err)throw err;
	if(result.affectedRows>0){res.send({code:200,msg:'update succeed'})}else{res.send({code:301,msg:'update error'})};
	});
});
//4用户更改start
//5用户检索start
router.get('/detail',(req,res)=>{
	var obj=req.query,$uid=obj.uid;
//内容不为空
	if(!$uid){res.send({code:400,msg:'uid required'});return};
//将查询结果反馈至网页
	pool.query('SELECT * FROM xz_user WHERE uid=?',$uid,(err,result)=>{
		if(err)throw err;
		if(result.length>0){res.send(result)}else{res.send('无查询结果')};
	});
}); 
//5用户检索end
//6分页查询start
router.get('/list',(req,res)=>{
	//浏览器请求的为数组格式，里面的属性值为字符串，需要转为数字格式
	var obj=req.query,$yema=obj.yema,$count=obj.count;
	//当不输入数据是，默认页码为1，数量为3
	if(!$yema){$yema=1};
	if(!$count){$count=3};
	var count1=Number($count),yema1=(Number($yema)-1)*count1;
	pool.query('SELECT * FROM xz_user LIMIT ?,?',[yema1,count1],(err,result)=>{
		if(err)throw err;
		if(result.length>0){res.send(result)}else{res.send('no result')};
	});
});
//6分页查询end
//7验证账号重复
router.get('/cuname',(req,res)=>{
   var obj=req.query;
//如果为空，则注册失败，return阻止程序往后进行
  var $uname=obj.uname;
  if (!$uname){res.send({code:401,msg:'uname required'});return};
//把用户信息插入数据库
  pool.query('SELECT * FROM xz_user WHERE uname=?',[$uname],(err,result)=>{if(err)throw err;
//判断affectedRows是否大于0（是否插入成功）
    if (result.length>0){res.send({code:300,msg:'账号已存在'})}else{res.send({code:200,msg:'账号可以注册'})};
	}); 
});
//7end
//8头部验证是否登录
router.get("/islogin",(req,res)=>{
  console.log(req.session.uid);
  if(req.session.uid===undefined)
    {res.send({ok:0,uid:toString(req.session.uid)});}
  else
		{
		var uid=req.session.uid;
		pool.query('SELECT uname FROM xz_user WHERE uid = ?',[uid],(err,result)=>{
			if(err)throw err ;
			if(result.length>0){res.send({ok:1,uname:result[0].uname,uid:uid})}else{res.send({ok:0})}
		})
	}
})
//8end
//9注销
router.get("/signout",(req,res)=>{
  req.session.uid=undefined;
  res.send({code:1});
})
//9end
//导出路由器
module.exports=router;
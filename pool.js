//用于创建mysql连接
const mysql=require('mysql');
var pool=mysql.createPool({
	host:'127.0.0.1',
	port:'3306',
	user:'root',
	password:'',
	database:'manluotuo',
	connectionLimit:15
});
//将连接池导出
module.exports=pool;
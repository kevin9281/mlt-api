var uname=document.getElementById('uname'),upwd=document.getElementById('upwd');
uname.onblur=upwd.onblur=function(){
    if(this.value==''){
        var content=this.parentNode.previousElementSibling.innerHTML.slice(0,-1)
        this.nextElementSibling.innerHTML=`${content}不能为空`
    }else{this.nextElementSibling.innerHTML=``}
}
var loginbtn=document.getElementById('loginbtn');
loginbtn.onclick=function(){
    if(uname.value!=''&&upwd.value!=''){
        $.ajax({
            url:'http://127.0.0.1:3000/user/login',
            data:{uname:uname.value,upwd:upwd.value},
            type:'post',
            success: function(res) {
                if(res.code==200){alert('登陆成功');sessionStorage.setItem('uname',uname.value);sessionStorage.setItem('uid',res.uid);location='./index.html'}else{alert('账号或密码错误');upwd.nextElementSibling.innerHTML=`账号或密码错误`}
            }
        })
    }
}
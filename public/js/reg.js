var uname=document.getElementById('uname'),upwd=document.getElementById('upwd'),cupwd=document.getElementById('cupwd'),email=document.getElementById('email');
var iuname=false,iupwd=false,icupwd=false,iemail=false;
uname.onblur=function(){
    if(this.value==''){
        var content=this.parentNode.previousElementSibling.innerHTML.slice(0,-1)
        this.nextElementSibling.innerHTML=`<img src="img/commom/err.png" alt="">${content}不能为空`;
        iuname=false;
    }else if(!vali(this,/^\w{1,10}$/)){this.nextElementSibling.innerHTML='<img src="img/commom/err.png" alt="">10个以内的字母、数字或下划线的组合';iuname=false;}else{
        this.nextElementSibling.innerHTML='<img src="img/commom/ok.png" alt="">账号可注册';
        $.ajax({
            url:'http://127.0.0.1:3000/user/cuname',
            data:{uname:uname.value},
            type:'get',
            success: (res) =>{
                if(res.code==300){this.nextElementSibling.innerHTML='<img src="img/commom/err.png" alt="">账号已存在';iuname=false;}else{this.nextElementSibling.innerHTML='<img src="img/commom/ok.png" alt="">账号可注册';iuname=true;}
            }
        })
        }
}
uname.onfocus=function(){
    this.nextElementSibling.innerHTML=`*10个以内的字母、数字或下划线的组合`
}
upwd.onblur=function(){
    if(this.value==''){
        var content=this.parentNode.previousElementSibling.innerHTML.slice(0,-1)
        this.nextElementSibling.innerHTML=`<img src="img/commom/err.png" alt="">${content}不能为空`;
        iupwd=false;
    }else if(!vali(this,/^\w{6,8}$/)){this.nextElementSibling.innerHTML='<img src="img/commom/err.png" alt="">6-8个以内的字母、数字或下划线的组合';iupwd=false;}else{this.nextElementSibling.innerHTML='<img src="img/commom/ok.png" alt="">';iupwd=true;}
}
upwd.onfocus=function(){
    this.nextElementSibling.innerHTML=`*6-8个以内的字母、数字或下划线的组合`
}
email.onblur=function(){
    if(this.value==''){
        var content=this.parentNode.previousElementSibling.innerHTML.slice(0,-1)
        this.nextElementSibling.innerHTML=`<img src="img/commom/err.png" alt="">${content}不能为空`;
        iemail=false;
    }else if(!vali(this,/^\w+@[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)+$/)){this.nextElementSibling.innerHTML='<img src="img/commom/err.png" alt="">正确的邮箱地址';iemail=false;}else{this.nextElementSibling.innerHTML='<img src="img/commom/ok.png" alt="">';iemail=true;}
}
email.onfocus=function(){
    this.nextElementSibling.innerHTML=`*正确的邮箱地址`
}
cupwd.onblur=function(){
    if(cupwd.value==upwd.value&&cupwd.value!=''){this.nextElementSibling.innerHTML='<img src="img/commom/ok.png" alt="">';icupwd=true;}else{this.nextElementSibling.innerHTML='<img src="img/commom/err.png" alt="">密码不一致';icupwd=false;}
}
function vali(txt,reg){
  //用reg测试当前文本框的内容
  if(reg.test(txt.value))
    {return true;}else{return false;}
}
ureg.onclick=function(){
    uname.onblur();
    upwd.onblur();
    email.onblur();
    cupwd.onblur();
    if(iuname&&iupwd&&iemail&&icupwd){
        $.ajax({
            url:'http://127.0.0.1:3000/user/reg',
            type:'post',
            data:{uname:uname.value,upwd:upwd.value,email:email.value},
            success:(res)=>{if(res.code==200){alert('注册成功');location='/login.html'}else{alert('注册失败')}}
        })}else{alert('请正确填写信息')}
}

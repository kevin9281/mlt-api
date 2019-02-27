$(function(){
    $.ajax({
        url:'http://127.0.0.1:3000/user/islogin',
        type:'get',
        success: function(res) {
            console.log(res.uid);
            if(res.ok==1){$('#unlog').css('display','none');$('#loged').css('display','block');$('#loged>span').html(`您好，${res.uname}, 欢迎您回来！`);sessionStorage.setItem('uid',res.uid);sessionStorage.setItem('uname',res.uname);
        $.ajax({
            url:'http://127.0.0.1:3000/product/shoppingcart',
            type:'get',
            data:{uid:sessionStorage.getItem('uid')},
            success: function(res) {
                var cartCount=document.getElementById('cartCount');
                cartCount.innerHTML=res.data.length;
            }
        })
        }else{sessionStorage.removeItem('uname');sessionStorage.removeItem('uid')}
        }
    })
})
$('#logout').on('click',function(){
    $.ajax({
        url:'http://127.0.0.1:3000/user/signout',
        type:'get',
        success: function(res) {
            sessionStorage.removeItem('uname');
            sessionStorage.removeItem('uid');
            window.reload();
        }
    })
})
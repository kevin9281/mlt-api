//先要动态加载头部
//动态加载内容
$(function(){
    var pid=window.location.search.slice(5);
    $.ajax({
        url:'http://127.0.0.1:3000/product/detail',
        type:'get',
        data:{pid},
        success: function(res) {
            console.log(res.data.goodPic.split(' ')[0]);
            var rou=res.data.family_id;
            if(rou==2){rou='新品预售'}else if(rou==1){rou='手办专区'}else if(rou==3){rou='模型专区'}
            var html=` <div class='ur_here'>
            当前位置: <a href="/index.html">首页</a><span>></span><a href="">${rou}</a><span>></span> ${res.data.title}
        </div>
        <div class='good-pic-info clearfix'>
            <div class='good-pic'>
                <div class='big-pic'>
                    <div class='leftArrow'></div>
                    <img src='${res.data.goodPic.split(' ')[0]}' alt="">
                    <div class='rightArrow'></div>
                </div>
                <div class='small-pic'>
                        <ul>
                                <li><img src="${res.data.goodPic.split(' ')[0]}" alt="" class='show'></li>
                                <li><img src="${res.data.goodPic.split(' ')[1]}" alt=""></li>
                                <li><img src="${res.data.goodPic.split(' ')[2]}" alt=""></li>
                        </ul>
                </div>
            </div>
            <div class='good-info clearfix'>
                <div class='good-title'>
                        <p class='name'>${res.data.title}</p>
                </div>
                <div class='good-content'>
                        <ul>
                                <li>
                                        <span class='good-content-title'>本店售价：</span>
                                        <span class='good-newprice'>${res.data.price}</span>
                                        <span class='good-content-title'>商品品牌：</span>
                                        <a class='good-brand'>myethos</a>
                                </li>
                                <li>
                                        <span class='good-content-title'>市场价格：</span>
                                        <del class='good-oldprice'>￥${res.data.oldprice}元</del>
                                        <span class='good-content-title'>商品库存：</span>
                                        <span class='good-stock'>仅剩${res.data.stock}件</span>
                                </li>
                                <li>
                                        <span class='good-content-title'>款式：</span>
                                        <a class='good-type'>${res.data.type}</a>
                                </li>
                                <li>
                                        <span class='good-content-title'>购买数量：</span>
                                        <button class='good-count-less'>-</button>
                                        <input type="text" min='0' value='1' maxlength="3" style="width:30px" id='Gcount' readonly>
                                        <button class='good-count-more'>+</button>
                                        <span class='good-content-title'>商品总价：</span>
                                        <span class='good-total'>￥${res.data.price}元</span>
                                </li>
                                <li>
                                        <a class='good-buy'>立即购买</a>
                                        <a class='good-addcart' id='addcart'>加入购物车</a>
                                </li>
                                <li>
                                        <img src="img/commom/wxappgetqr.png" alt="" class='addwx'>
                                </li>
                        </ul>
                </div>
            </div>
        </div>
        <div class='promise'>
                <img src="img/commom/promise.jpg" alt="">
        </div>
        <div class='good-detail'>
                <ul>
                        <li ><h3 class='check'>产品简介</h3>|</li>
                        <li><h3>用户评价</h3>|</li>
                        <li><h3>常见问题</h3></li>
                </ul>
                <img src="${res.data.detailPic.split(' ')[0]}" alt="">
                <img src="${res.data.detailPic.split(' ')[1]}" alt="">
                <img src="${res.data.detailPic.split(' ')[2]}" alt="">
                <img src="${res.data.detailPic.split(' ')[3]}" alt="">
                <img src="${res.data.detailPic.split(' ')[4]}" alt="">
                <img src="${res.data.detailPic.split(' ')[5]}" alt="">
                <img src="${res.data.detailPic.split(' ')[6]}" alt="">
                <img src="${res.data.detailPic.split(' ')[7]}" alt="">
                <img src="${res.data.detailPic.split(' ')[8]}" alt="">
                <img src="${res.data.detailPic.split(' ')[9]}" alt="">
        </div>` ;
        var container=document.querySelector('.detail_container');
        container.innerHTML=html;
        //内容功能
        $('.small-pic li img').on('click',function(){
            $('.small-pic li img.show').removeClass('show');
            $(this).addClass('show');
            var src=$(this).attr('src');
            $('.good-pic-info .good-pic .big-pic img').attr('src',src)
        });
        var right=document.querySelector('.good-pic-info .good-pic .big-pic .rightArrow');
        var left=document.querySelector('.good-pic-info .good-pic .big-pic .leftArrow');
        right.addEventListener('click',function(){
            var a=document.querySelector('.small-pic li img.show');
            a.className='';
            if(a.parentNode.nextElementSibling){
                a.parentNode.nextElementSibling.firstElementChild.className='show';
                document.querySelector('.good-pic-info .good-pic .big-pic img').src=a.parentNode.nextElementSibling.firstElementChild.src;
            }else{a.parentNode.parentNode.firstElementChild.firstElementChild.className='show'; document.querySelector('.good-pic-info .good-pic .big-pic img').src=a.parentNode.parentNode.firstElementChild.firstElementChild.src}
        })
        left.addEventListener('click',function(){
            var a=document.querySelector('.small-pic li img.show');
            a.className='';
            if(a.parentNode.previousElementSibling){
                a.parentNode.previousElementSibling.firstElementChild.className='show';
                document.querySelector('.good-pic-info .good-pic .big-pic img').src=a.parentNode.previousElementSibling.firstElementChild.src;
            }else{a.parentNode.parentNode.lastElementChild.firstElementChild.className='show'; document.querySelector('.good-pic-info .good-pic .big-pic img').src=a.parentNode.parentNode.lastElementChild.firstElementChild.src}
        })
        $('.good-pic-info .good-info .good-content .good-count-less').on('click',function(){
            if($('#Gcount').val()>1){$('#Gcount').val(`${$('#Gcount').val()-1}`);$('.good-pic-info .good-info .good-content .good-total').html(`￥${parseFloat($('#Gcount').val()*parseFloat($('.good-newprice').html()))}元`)}
        })
        $('.good-pic-info .good-info .good-content .good-count-more').on('click',function(){
            if($('#Gcount').val()<99){$('#Gcount').val(`${Number($('#Gcount').val())+1}`);$('.good-pic-info .good-info .good-content .good-total').html(`￥${parseFloat($('#Gcount').val()*parseFloat($('.good-newprice').html()))}元`)}
        });
        $('#addcart').on('click',function(){
            if(sessionStorage.getItem('uid')){
                var uid=sessionStorage.getItem('uid');
                var pid=location.search.slice(5);
                var count=$('#Gcount').val();
                $.ajax({
                    url:'http://127.0.0.1:3000/product/addcart',
                    type:'get',
                    data:{uid,pid,count},
                    success: function(res) {
                        if(res.code==1){alert('添加成功');location.reload()}else{alert('添加失败')}
                    }
                })
            }else{alert('请登录');location='login.html'}
        })


        }
    })
})


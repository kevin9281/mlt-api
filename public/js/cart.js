$(function load(){
    if(sessionStorage.getItem('uid')){
        $.ajax({
            url:'http://127.0.0.1:3000/product/shoppingcart',
            type:'get',
            data:{uid:sessionStorage.getItem('uid')},
            success: function(res) {
                console.log(res);
                if(res.code==1){
                   /*  console.log(res.data)
                    var frag=document.createDocumentFragment();
                    for(var i in res.data){
                        var tr=document.createElement('tr');
                        var checks=document.createElement('td');
                        var check=document.createElement('input');
                        check.type='checkbox';
                        checks.appendChild(check);
                        tr.appendChild(checks);
                        console.log(tr)
                        for(var e in res.data[i]){
                            var td=document.createElement('td');
                            td.innerHTML=res.data[i][e];
                            tr.appendChild(td);
                        }
                        frag.appendChild(tr);
                    }
                    var tbody=document.getElementById('tableBody');
                    tbody.appendChild(frag); */
                    var html='';
                    for(var i in res.data){
                        html+=`
                        <tr>
                            <td><input type="checkbox" class="ischeck"></td>
                            <td>${res.data[i].pid}</td>
                            <td><a href="http://127.0.0.1:3000/prodetail.html?pid=${res.data[i].pid}" style="color:#656d78;">${res.data[i].title}</a></td>
                            <td>￥ <span>${res.data[i].price}</span>.00元</td>
                            <td><button class='cart-count-less'>-</button><input type="text" min='0' value='${res.data[i].count}' maxlength="3" style="width:30px" class='Ccount' readonly><button class='cart-count-more'>+</button></td>
                            <td>￥ <span class='Ctotal'>${res.data[i].price*res.data[i].count}</span>.00元</td>
                            <td><span class='delete' style='color: #FF8400;cursor: pointer'>删除</span></td>
                        </tr>`
                    }
                    var tbody=document.getElementById('tableBody');
                    tbody.innerHTML=html;
                    $('#tableBody').on('click','button.cart-count-more',function(){
                        if($(this).prev('.Ccount').val()<20){
                            $(this).prev('.Ccount').val(`${parseInt($(this).prev('.Ccount').val())+1}`);
                            $(this).parent().next().children().first().html(`${$(this).prev('.Ccount').val()*$(this).parent().prev().children().first().html()}`);
                            var uid=sessionStorage.getItem('uid');
                            var pid=$(this).parent().prev().prev().prev().html();
                            var count=$(this).prev('.Ccount').val();
                            console.log(count)
                            $.ajax({
                                url:'http://127.0.0.1:3000/product/updatecart',
                                type:'get',
                                data:{uid,pid,count},
                                success: function(res) {
                                    if(res.code==1){console.log('ok')}else{console.log('false')}
                                }
                            });
                            if(this.parentNode.parentNode.firstElementChild.firstElementChild.checked){
                                $('#totalprice').html(`${Number($('#totalprice').html())+Number($(this).parent().prev().children().first().html())}`);
                            }
                        }
                    });
                    $('#tableBody').on('click','button.cart-count-less',function(){
                        if($(this).next('.Ccount').val()>1){
                            $(this).next('.Ccount').val(`${parseInt($(this).next('.Ccount').val())-1}`);
                            $(this).parent().next().children().first().html(`${$(this).next('.Ccount').val()*$(this).parent().prev().children().first().html()}`);
                            var uid=sessionStorage.getItem('uid');
                            var pid=$(this).parent().prev().prev().prev().html();
                            var count=$(this).next('.Ccount').val();
                            console.log(count)
                            $.ajax({
                                url:'http://127.0.0.1:3000/product/updatecart',
                                type:'get',
                                data:{uid,pid,count},
                                success: function(res) {
                                    if(res.code==1){console.log('ok')}else{console.log('false')}
                                }
                            });
                            if(this.parentNode.parentNode.firstElementChild.firstElementChild.checked){
                                $('#totalprice').html(`${Number($('#totalprice').html())-Number($(this).parent().prev().children().first().html())}`);
                            }
                        }
                    });
                    $('#tableBody').on('click','span.delete',function(){
                        if(confirm('是否将此商品移除购物车')){
                            var uid=sessionStorage.getItem('uid');
                            var pid=$(this).parent().prev().prev().prev().prev().prev().html();
                            console.log(pid);
                            $.ajax({
                                url:'http://127.0.0.1:3000/product/deletecart',
                                type:'get',
                                data:{uid,pid},
                                success: function(res) {
                                    if(res.code==1){alert('删除成功');location.reload()}
                                }
                            })
                        }
                    });
                   $('#tableBody').on('click','input.ischeck',function(){
                       if(this.checked){
                           $('#totalprice').html(`${Number($('#totalprice').html())+Number($(this).parent().parent().find('span.Ctotal').html())}`);
                        }else{
                           $('#totalprice').html(`${Number($('#totalprice').html())-Number($(this).parent().parent().find('span.Ctotal').html())}`);
                        }
                   });
                   $('#cartoperation').on('click','#checkAll',function(){
                       var cartprice=0;
                       for(var e of $('#tableBody span.Ctotal')){
                        cartprice+=Number(e.innerHTML)
                       }
                        if($('#tableBody input.ischeck:not(:checked)').length>0){
                           $('#tableBody input.ischeck').prop('checked',true);$('#totalprice').html(`${cartprice}`)
                        }else{$('#tableBody input.ischeck').prop('checked',false);$('#totalprice').html('0')}
                   });
                   $('#cartoperation').on('click','#clearAll',function(){
                        if(confirm('是否清空购物车所有商品')){
                            $.ajax({
                                url:'http://127.0.0.1:3000/product/clearcart',
                                type:'get',
                                data:{uid:sessionStorage.getItem('uid')},
                                success: function(res) {
                                    if(res.code==1){alert('清空成功');location.reload()}else{alert('清空失败');location.reload()}
                                }
                            })
                        }
                   });
                }else{document.getElementById('tableBody').innerHTML='';}
            }
        })
    }
})
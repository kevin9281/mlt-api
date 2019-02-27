function task(){
    var img=slider.getElementsByClassName('show')[0];
    img.className='';
    if(img.parentNode.nextElementSibling)
    {img.parentNode.nextElementSibling.children[0].className='show';}else{img.parentNode.parentNode.children[0].children[0].className='show';}
    var img=sliderDiv.getElementsByClassName('actived')[0];
    img.className='';
    if(img.parentNode.nextElementSibling)
    {img.parentNode.nextElementSibling.children[0].className='actived';}else{img.parentNode.parentNode.children[0].children[0].className='actived';}
  }
  var timer=setInterval(task,3000);
  slider.onmouseover=function(){
    clearInterval(timer);
  };
  slider.onmouseout=function(){
    timer=setInterval(task,3000)
  };
  for(var sdiv of sliderDiv.children){
    sdiv.onmouseover=function(){
      clearInterval(timer);
    };
  }  
  for(var elem of sliderDiv.children){
      elem.onmouseout=function(){
      timer=setInterval(task,3000)
    };
  }

$('#sliderDiv').on('mouseenter','li',function(){
  var $li=$(this);
  $('#sliderDiv div.actived').removeClass('actived');
  $li.children().first().addClass('actived');
 var i=$li.index();
  $(`#slider img.show`).removeClass('show');
  $(`#slider a:nth-child(${i+1})`).children().first().addClass('show')
})
$('#leftArrow').hover(function(){
  clearInterval(timer);
},function(){
  timer=setInterval(task,3000)
}).click(function task(){
  var img=slider.getElementsByClassName('show')[0];
  img.className='';
  if(img.parentNode.previousElementSibling)
  {img.parentNode.previousElementSibling.children[0].className='show';}else{img.parentNode.parentNode.children[9].children[0].className='show';}
  var img=sliderDiv.getElementsByClassName('actived')[0];
  img.className='';
  if(img.parentNode.previousElementSibling)
  {img.parentNode.previousElementSibling.children[0].className='actived';}else{img.parentNode.parentNode.children[9].children[0].className='actived';}
});
$('#rightArrow').hover(function(){
  clearInterval(timer);
},function(){
  timer=setInterval(task,3000)
}).click(function(){task()});

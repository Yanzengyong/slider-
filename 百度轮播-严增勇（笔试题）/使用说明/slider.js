//注：因为c3中的transition存在兼容性问题，所以我们可以就封装一个简单的animate方法
function animate(element,target) {
    clearInterval(element.timer);
    element.timer=setInterval(function () {
        var step=8;
        var current=element.offsetLeft;
        step=current<target?step:-step;
        if(Math.abs(target-current)<=Math.abs(step)){
            clearInterval(element.timer);
            element.style.left=target+"px";
        }else{
            current=current+step;
            element.style.left=current+"px";
        }
    },16);
}
function slider(Object){
    //获取id为abc的盒子
    var parentId=Object.parent.slice(1);
    console.log(parentId)
    var dv=document.getElementById(parentId);
    console.log(Object.data);
    //获取这个盒子的宽度
    var dvWidth=dv.clientWidth;
    console.log(dvWidth);
    //创建ul标签
    var ul=document.createElement('ul');
    console.log(ul);
    //创建一个p标签添加到id为abc的盒子中的第一个子盒子（如果需要用这个功能必须按照上面的html方式编写）
    var h3=document.createElement('h3');
    //为h3标签里面添加内容
    dv.children[0].appendChild(h3);
    //调用封装好的setinnertext方法
    setInnerText(h3,Object.data[0].title)
    console.log(h3);
    //因为innerText存在兼容性问题，所以我们可以封装一个兼容性的代码
    function setInnerText(element,content) {
        if(element.innerText){
            element.innerText=content;
        }else{
            element.textContent=content;
        }
    }
    //给inside-move盒子中的li里面的b添加内容
    if(document.getElementById('inside-ul')){
        var insideUl=document.getElementById('inside-ul');
        var insidelis=insideUl.getElementsByTagName('li');
        console.log(insidelis);
        for(var i=0;i<insidelis.length;i++){
            insidelis[i].style.background="url("+Object.data[i].img+")";
            insidelis[i].style.backgroundSize="92px 100%";
            var insideb=insidelis[i].getElementsByTagName('b')[0];
            setInnerText(insideb,Object.data[i].title);
            console.log(insideb);
        }
    }

    for(var i=0;i<Object.data.length;i++){
        //数组中有多少个对象就创建多少个li标签和a标签还有img标签
        var li=document.createElement('li');
        var a=document.createElement('a');
        var img=document.createElement('img');
        var span=document.createElement('span');
        var b=document.createElement('b');
        //把img和a放到li中
        ul.appendChild(li)
        li.appendChild(a);
        a.appendChild(img);
        //为img的src属性赋值
        img.src=Object.data[i].img
        dv.appendChild(ul);
    }
    //为了实现轮播，我们还要动态创建ul中的第一个li标签并且把他放到最后面
    ul.appendChild(ul.children[0].cloneNode(true));
    //准备工作完成后 我们要实现轮播效果
    var timer;
    //设置从第一张开始
    var index=0;
    //设置移动得到距离
    var current=-(dvWidth*index);
//            timer=setInterval(function(){
//                index++;
//                //定义一个移动的距离
//                var current=-(dvWidth*index);
//                //利用c3新属性实现过渡效果和保证兼容
//                ul.style.transition="all 1s";
//                ul.style.webkitTransition="all 1s";
//                ul.style.msTransition="all 1s";
//                //用translateX实现过渡方式
//                ul.style.transform="translateX("+current+"px)";
//                ul.style.webkitTransform="translateX("+current+"px)";
//                ul.style.msTransform="translateX("+current+"px)";
//                //实现无缝连接，做判断
//                    if(index>=Object.data.length+1){
//                        index=0;
//                        ul.style.transition='none';
//                        ul.style.webkitTransition='none';
//                        ul.style.msTransform='none';
//                        current=-(index*dvWidth);
//                        ul.style.transform="translateX("+current+"px)";
//                        ul.style.webkitTransform="translateX("+current+"px)";
//                        ul.style.msTransform="translateX("+current+"px)";
//                    }
//
//            },1000)
    //我们要为按钮添加点击事件，实现点击移动
    //开启定时器
    timer=setInterval(function(){
        if(index>=Object.data.length){
            ul.style.left=0+"px";
            index=0;
        }
        index++;
        console.log(index)
        //给inside-text盒子中添加改变h3内容
        dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
        current=-(dvWidth*index);
        animate(ul, current);
        //给下面的小图添加相应的被选效果
        for (var i=0; i<insidelis.length; i++) {
            insidelis[i].className = "";
        }
        if(index==Object.data.length){
            insidelis[0].className = "current"
        }else{
            insidelis[index].className = "current";
        }
    },3000);
    //给右按钮注册点击事件
    var btnright=document.getElementById('link-right');
    //再注册一个鼠标进入事件保证点击的时候不发生BUG
    btnright.onmouseover=function(){
        clearInterval(timer);
    };
    btnright.onmouseout=function(){
        timer=setInterval(function(){
            if(index>=Object.data.length){
                ul.style.left=0+"px";
                index=0;
            }
            index++;
            console.log(index)
            //给inside-text盒子中添加改变h3内容
            dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
            current=-(dvWidth*index);
            animate(ul, current);
            //给下面的小图添加相应的被选效果
            for (var i=0; i<insidelis.length; i++) {
                insidelis[i].className = "";
            }
            if(index==Object.data.length){
                insidelis[0].className = "current"
            }else{
                insidelis[index].className = "current";
            }
        },3000);
    };
    btnright.onclick=function(){
        if(index>=Object.data.length){
            ul.style.left=0+"px";
            index=0;
        }
        index++;
        console.log(index)
        //给inside-text盒子中添加改变h3内容
        dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
        current=-(dvWidth*index);
        animate(ul, current);
        //给下面的小图添加相应的被选效果
        for (var i=0; i<insidelis.length; i++) {
            insidelis[i].className = "";
        }
        if(index==Object.data.length){
            insidelis[0].className = "current"
        }else{
            insidelis[index].className = "current";
        }

    }
    //给左按钮添加点击事件，其他同上
    var btnleft=document.getElementById('link-left');
    btnleft.onmouseover=function(){
        clearInterval(timer);
    };
    btnleft.onmouseout=function(){
        timer=setInterval(function(){
            if(index>=Object.data.length){
                ul.style.left=0+"px";
                index=0;
            }
            index++;
            console.log(index)
            //给inside-text盒子中添加改变h3内容
            dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
            current=-(dvWidth*index);
            animate(ul, current);
            //给下面的小图添加相应的被选效果
            for (var i=0; i<insidelis.length; i++) {
                insidelis[i].className = "";
            }
            if(index==Object.data.length){
                insidelis[0].className = "current"
            }else{
                insidelis[index].className = "current";
            }
        },3000);
    };
    btnleft.onclick=function(){
        if(index==0){
            index=Object.data.length;
            ul.style.left=-(Object.data.length)*dvWidth+"px";
        }
        index--;
        dv.children[0].innerHTML = index==0?"<h3>"+Object.data[index].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
        current=-(dvWidth*index);
        animate(ul,current);
        //给下面的小图添加相应的被选效果
        for (var i=0; i<insidelis.length; i++) {
            insidelis[i].className = "";
        }
        if(index==Object.data.length){
            insidelis[0].className = "current"
        }else{
            insidelis[index].className = "current";
        }
    }

}/**
 * Created by 严增勇 on 2016/11/20.
 */

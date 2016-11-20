//ע����Ϊc3�е�transition���ڼ��������⣬�������ǿ��Ծͷ�װһ���򵥵�animate����
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
    //��ȡidΪabc�ĺ���
    var parentId=Object.parent.slice(1);
    console.log(parentId)
    var dv=document.getElementById(parentId);
    console.log(Object.data);
    //��ȡ������ӵĿ��
    var dvWidth=dv.clientWidth;
    console.log(dvWidth);
    //����ul��ǩ
    var ul=document.createElement('ul');
    console.log(ul);
    //����һ��p��ǩ��ӵ�idΪabc�ĺ����еĵ�һ���Ӻ��ӣ������Ҫ��������ܱ��밴�������html��ʽ��д��
    var h3=document.createElement('h3');
    //Ϊh3��ǩ�����������
    dv.children[0].appendChild(h3);
    //���÷�װ�õ�setinnertext����
    setInnerText(h3,Object.data[0].title)
    console.log(h3);
    //��ΪinnerText���ڼ��������⣬�������ǿ��Է�װһ�������ԵĴ���
    function setInnerText(element,content) {
        if(element.innerText){
            element.innerText=content;
        }else{
            element.textContent=content;
        }
    }
    //��inside-move�����е�li�����b�������
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
        //�������ж��ٸ�����ʹ������ٸ�li��ǩ��a��ǩ����img��ǩ
        var li=document.createElement('li');
        var a=document.createElement('a');
        var img=document.createElement('img');
        var span=document.createElement('span');
        var b=document.createElement('b');
        //��img��a�ŵ�li��
        ul.appendChild(li)
        li.appendChild(a);
        a.appendChild(img);
        //Ϊimg��src���Ը�ֵ
        img.src=Object.data[i].img
        dv.appendChild(ul);
    }
    //Ϊ��ʵ���ֲ������ǻ�Ҫ��̬����ul�еĵ�һ��li��ǩ���Ұ����ŵ������
    ul.appendChild(ul.children[0].cloneNode(true));
    //׼��������ɺ� ����Ҫʵ���ֲ�Ч��
    var timer;
    //���ôӵ�һ�ſ�ʼ
    var index=0;
    //�����ƶ��õ�����
    var current=-(dvWidth*index);
//            timer=setInterval(function(){
//                index++;
//                //����һ���ƶ��ľ���
//                var current=-(dvWidth*index);
//                //����c3������ʵ�ֹ���Ч���ͱ�֤����
//                ul.style.transition="all 1s";
//                ul.style.webkitTransition="all 1s";
//                ul.style.msTransition="all 1s";
//                //��translateXʵ�ֹ��ɷ�ʽ
//                ul.style.transform="translateX("+current+"px)";
//                ul.style.webkitTransform="translateX("+current+"px)";
//                ul.style.msTransform="translateX("+current+"px)";
//                //ʵ���޷����ӣ����ж�
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
    //����ҪΪ��ť��ӵ���¼���ʵ�ֵ���ƶ�
    //������ʱ��
    timer=setInterval(function(){
        if(index>=Object.data.length){
            ul.style.left=0+"px";
            index=0;
        }
        index++;
        console.log(index)
        //��inside-text��������Ӹı�h3����
        dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
        current=-(dvWidth*index);
        animate(ul, current);
        //�������Сͼ�����Ӧ�ı�ѡЧ��
        for (var i=0; i<insidelis.length; i++) {
            insidelis[i].className = "";
        }
        if(index==Object.data.length){
            insidelis[0].className = "current"
        }else{
            insidelis[index].className = "current";
        }
    },3000);
    //���Ұ�ťע�����¼�
    var btnright=document.getElementById('link-right');
    //��ע��һ���������¼���֤�����ʱ�򲻷���BUG
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
            //��inside-text��������Ӹı�h3����
            dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
            current=-(dvWidth*index);
            animate(ul, current);
            //�������Сͼ�����Ӧ�ı�ѡЧ��
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
        //��inside-text��������Ӹı�h3����
        dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
        current=-(dvWidth*index);
        animate(ul, current);
        //�������Сͼ�����Ӧ�ı�ѡЧ��
        for (var i=0; i<insidelis.length; i++) {
            insidelis[i].className = "";
        }
        if(index==Object.data.length){
            insidelis[0].className = "current"
        }else{
            insidelis[index].className = "current";
        }

    }
    //����ť��ӵ���¼�������ͬ��
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
            //��inside-text��������Ӹı�h3����
            dv.children[0].innerHTML = index==Object.data.length?"<h3>"+Object.data[0].title+"</h3>":"<h3>"+Object.data[index].title+"</h3>";
            current=-(dvWidth*index);
            animate(ul, current);
            //�������Сͼ�����Ӧ�ı�ѡЧ��
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
        //�������Сͼ�����Ӧ�ı�ѡЧ��
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
 * Created by ������ on 2016/11/20.
 */

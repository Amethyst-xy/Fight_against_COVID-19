function my$(id) {
    return document.getElementById(id);
}
//获取属性值
function getStyle(element,attr) {
    return window.getComputedStyle?window.getComputedStyle(element,null)[attr]:element.currentStyle[attr]||0;
}

function animate(element,target) {
    clearInterval(element.timeid);
    element.timeid=setInterval(function () {
        var w=parseInt(getStyle(element,"left"));
        var step=5;
        step=w<target?step:-step;

        if(Math.abs(w-target)>Math.abs(step)){
            w+=step;
        }else{
            w=target;
            clearInterval(element.timeid);
        }
        element.style.left=w+"px";
    },1);
}

//变速动画函数
function animate1(element,json) {
    clearInterval(element.timeid);
    element.timeid=setInterval(function () {
        var flag=1;
        for(var attr in json){
            var cur=parseInt(getStyle(element,attr));
            var step=(json[attr]-cur)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            cur+=step;
            if(cur!=json[attr]) {
                flag = 0;
            }
            element.style[attr]=cur+"px";
        }
        if(flag)
            clearInterval(element.timeid);
    },15);
}

//变速动画回调函数
function animate2(element,json,fn) {
    clearInterval(element.timeid);
    element.timeid=setInterval(function () {
        var flag=true;
        for(var attr in json){
            var cur=parseInt(getStyle(element,attr));
            var step=(json[attr]-cur)/10;
            step=step>0?Math.ceil(step):Math.floor(step);
            cur+=step;
            if(cur!=json[attr]){
                flag=false;
            }
            element.style[attr]=cur+"px";
        }
        if(flag){
            clearInterval(element.timeid);
            //所有属性到达目标后才能调用这个函数，前提是出入这个函数
            if(fn){
                fn();
            }
        }
    },15);
}

//变速动画+层级+透明度+回调
function animate3(element,json,fn) {
    clearInterval(element.timeid);
    element.timeid=setInterval(function () {
        var flag=true;
        for(var attr in json){

            if(attr=="z-index"){
                element.style[attr]=json[attr];
            }else if(attr=="opacity"){
                var cur=getStyle(element,attr)*100;//放大100倍
                var target=json[attr]*100;
                var step=(target-cur)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                cur+=step;
                element.style[attr]=cur/100;
            }else{
                var cur=parseInt(getStyle(element,attr));
                var target=json[attr];
                var step=(target-cur)/10;
                step=step>0?Math.ceil(step):Math.floor(step);
                cur+=step;
                element.style[attr]=cur+"px";
            }
            if(cur!=target){
                flag=false;
            }
        }
        if(flag){
            clearInterval(element.timeid);
            if(fn){
                fn();
            }
        }
    },15);
}


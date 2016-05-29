/**
 * Created by fReDDy on 29.05.2016.
 */
function generateMassive (currentSize){
    var div=document.getElementById("container");
    var count=+document.getElementById("elementCount").value;
    for (var i=0;i<count;i++)
    {
        var randomNumber= getRandomNumber(1,100);
        createElement(div,i,randomNumber,currentSize);
    }
}
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function createElement(div,id,value,currentSize) {
    var element = document.createElement("div"),
        span = document.createElement("span");
    element.id = id;
    element.style.opacity = 0;
    element.className = "number";
    if (currentSize.width > 90) {
        currentSize.width = 2;
        currentSize.top = currentSize.top + 20;

    }
    var style = document.getElementById("style");
    if (id == 0) {
        style.innerHTML = "";
    }
    style.innerHTML += "@-webkit-keyframes appear" + id + " {\
            0%   {opacity:0;top:0%;left:0%;}\
            100% {opacity:1;top:" + currentSize.top + "%;left:" + currentSize.width + "%;}\
            }\
        .appear" + id + "{\
        -webkit-animation-name: appear" + id + ";\
        -webkit-animation-duration: 1s;\
        -webkit-animation-fill-mode: forwards;\
        -webkit-animation-delay:" + id * 0.05 + "s;\
        }";
    element.style.top = currentSize.top + "%";
    element.style.left = currentSize.width + "%";
    element.classList.add("appear" + id);
    span.className = "num";
    span.innerHTML = value;
    element.appendChild(span);
    div.appendChild(element);
    currentSize.width += +element.getBoundingClientRect().width / parseFloat(document.getElementById("container").getBoundingClientRect().width) * 100 + 2;
}

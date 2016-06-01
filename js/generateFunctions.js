/**
 * Created by fReDDy on 29.05.2016.
 */

/*генерируем массив случайных чисел, и вставляем
каждый элемент в наш div-контейнер для отображения
 */
function generateMassive (currentSize,speed){
    var
        div=document.getElementById("container"),
        count=+document.getElementById("elementCount").value;
    for (var i=0;i<count;i++)
    {
        var randomNumber= getRandomNumber(1,100);
        createElement(div,i,randomNumber,currentSize,speed);
    }
}

//генерируем рандомное число
function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

/*проверяем введенные пользователем параметры количества элементов и скорости анимации
появления элементов и в случае провала подсвечиваем красным данные поля
  */
function checkGenerateNumberParameters(){
    var
        countElement=document.getElementById("elementCountDiv"),
        appearElement=document.getElementById("appearSpeedDiv"),
        regExp=/^[1-9]+[0]*[1-9]*$/;

    if (!regExp.test(countElement.children[1].value)||
        !regExp.test(appearElement.children[1].value)||
        +countElement.children[1].value<2 || +countElement.children[1].value>100 ||
        +appearElement.children[1].value<10) {
        countElement.children[1].style.backgroundColor="rgba(255,0,0,0.5)";
        appearElement.children[1].style.backgroundColor="rgba(255,0,0,0.5)";
        return false;
    }
    countElement.children[1].style.backgroundColor="";
    appearElement.children[1].style.backgroundColor="";
    return true;
}

/*
Создаем наше число, генерируем для него анимацию, и вставляем его в наш контейнер
 */
function createElement(div,id,value,currentSize,speed) {
    var
        element = document.createElement("div"),
        span = document.createElement("span"),
        style = document.getElementById("style");

    if (currentSize.width > 90) {
        currentSize.width = 2;
        currentSize.top = currentSize.top + 20;

    }

    if (id == 0) {
        style.innerHTML = "";
    }
    style.innerHTML += "@-webkit-keyframes appear" + id + " {\
            0%   {opacity:0;top:0%;left:0%;}\
            100% {opacity:1;top:" + currentSize.top + "%;left:" + currentSize.width + "%;}\
            }\
            @-ms-keyframes appear" + id + " {\
            0%   {opacity:0;top:0%;left:0%;}\
            100% {opacity:1;top:" + currentSize.top + "%;left:" + currentSize.width + "%;}\
            }\
            @-moz-keyframes appear" + id + " {\
            0%   {opacity:0;top:0%;left:0%;}\
            100% {opacity:1;top:" + currentSize.top + "%;left:" + currentSize.width + "%;}\
            }\
        .appear" + id + "{\
        -webkit-animation-name: appear" + id + ";\
        -webkit-animation-duration: 1s;\
        -webkit-animation-fill-mode: forwards;\
        -webkit-animation-delay:" + id * speed + "s;\
        -ms-animation-name:appear" + id + ";\
        -ms-animation-duration: 1s;\
        -ms-animation-fill-mode: forwards;\
        -ms-animation-delay:" + id * speed + "s;\
        -moz-animation-name:appear" + id + ";\
        -moz-animation-duration: 1s;\
        -moz-animation-fill-mode: forwards;\
        -moz-animation-delay:" + id * speed + "s;\
        }";
    element.id = id;
    element.style.opacity = 0;
    element.className = "number";
    element.style.top = currentSize.top + "%";
    element.style.left = currentSize.width + "%";
    element.classList.add("appear" + id);
    span.className = "numberSpan";
    span.innerHTML = value;
    element.appendChild(span);
    div.appendChild(element);
    currentSize.width += +element.getBoundingClientRect().width / parseFloat(document.getElementById("container").getBoundingClientRect().width) * 100 + 2;
}

/**
 * Created by fReDDy on 26.05.2016.
 */
document.addEventListener("DOMContentLoaded",function()
{
    function currentSize(width,top){
        this.width=width;
        this.top=top;
    }

    var
        backgroundDiv=document.getElementById("helpShadow"), //затемненный фон при появлении подсказки
        helpDiv=document.getElementById("helpDiv"), // сама подсказка
        count= 0,
        numberMass=[],
        currentSize=new currentSize(2,20);

    /*вешаем на каждое поле ввода событие нажатия клавиши, чтобы
    мы могли вводить в него только цифры
    */
    [].forEach.call(document.getElementsByTagName("input"),function(item) {
        item.addEventListener("keypress", function (event) {
            if (!/^\d$/.test(String.fromCharCode(event.which)) && !event.ctrlKey) {
                if (/Firefox/i.test(navigator.userAgent) && /backspace/i.test(event.code)) {
                    return;
                }
                else {
                    event.preventDefault();
                    return;
                }
            }
            item.style.backgroundColor = "";
        });
    });

    //вешаем анимацию появления подсказки на кнопку 'Помощь'
    document.getElementById("helpButton").addEventListener("click",function(){
            setHelpAnimationProperties(document.getElementById("keyframes").sheet.cssRules,0,0.7,0,1,"-50%","10%");
            backgroundDiv.style.display="block";
            helpDiv.style.display="block";
            backgroundDiv.classList.add("background-animate");
            helpDiv.classList.add("helpDiv-animate");
            helpDiv.addEventListener("animationend",helpAnimationEnd);
        });

    //вешаем анимацию закрытия подсказки на кнопку 'OK' внутри подсказки
    document.getElementById("closeHelpButton").addEventListener("click",function(){
            setHelpAnimationProperties(document.getElementById("keyframes").sheet.cssRules,0.7,0,1,0,"10%","-50%");
            backgroundDiv.classList.add("background-animate");
            helpDiv.classList.add("helpDiv-animate");
        });

    //событие кнопки 'Сгенерировать'
    document.getElementById("generateButton").addEventListener("click",function() {
        var
            success = checkGenerateNumberParameters();

        if (success) {
            reset();
            generateMassive(currentSize,+document.getElementById("appearSpeed").value/parseFloat(1000));
            document.getElementById("container").children[document.getElementsByClassName("number").length - 1].addEventListener("animationend", enableStartButton);

            for (var i = 0; i < document.getElementsByClassName("number").length; i++) {
                numberMass.push(document.getElementById(i));
            }
        }
    });

    document.getElementById("startButton").addEventListener("click",sortBubble);

    //сортировка пузырьком
    function sortBubble() {
        /*задаем таймаут анимации, в случае ошибки выходим из алгоритма
        в случае успеха стартуем алгоритм
        */
        var timeout=setSwapAnimationSpeed();
        if (+timeout==-1)
        {
            document.getElementById("swapSpeed").style.backgroundColor="rgba(255,0,0,0.5)";
            return;
        }
        document.getElementById("swapSpeed").style.backgroundColor="";
        document.getElementById("startButton").disabled=true;
        for (var j = 0, len = document.getElementsByClassName("number").length - 1; j < len; j++) {
            var
                swapped = false,
                i = 0;

            while (i < len) {
                if (+numberMass[i].children[0].innerHTML > +numberMass[i + 1].children[0].innerHTML) {

                    //задаем таймаут , чтобы анимация выполнялась последовательно для кадых двух элементов
                    setSwapAnimationTimeout(i, count,timeout);
                    var tmp=numberMass[i];
                    numberMass[i]=numberMass[i+1];
                    numberMass[i+1]=tmp;
                    count++;
                    swapped = true;
                }
                i++;
            }

            if (!swapped)
                break;
        }
    }

    //задаем таймаут выполнения анимации, чтобы новая анимация не перекрывала старую
    function setSwapAnimationTimeout(i,counter,timeout) {
        setTimeout(function() {
            var
                first = document.getElementById(i),
                second = document.getElementById(i+1);

            //после окончания анимации просто сохраняем получившиеся координаты элементов, чтобы они остались
            //на месте и мы могли их свапать с другими элементами в дальнейшем
            first.addEventListener("animationend",setNewElementPositions);
            function setNewElementPositions(){
                var left=first.style.left,
                    top=first.style.top,
                    leftID=first.id;

                first.style.top=second.style.top;
                second.style.top=top;
                first.style.left=second.style.left;
                second.style.left=left;
                first.id=second.id;
                second.id=leftID;
                first.classList.remove("first-animate");
                second.classList.remove("second-animate");
                first.removeEventListener("animationend",setNewElementPositions);
            }
            SetSwapAnimationProperties("keyframes", first, second, currentSize.top);

            //удаляем анимацию появления элементов, делаем элементы видимыми, и стартуем анимацию
            first.classList.remove("appear"+first.id);
            second.classList.remove("appear"+second.id);
            first.style.opacity=1;
            second.style.opacity=1;
            first.classList.add("first-animate");
            second.classList.add("second-animate");
        }, counter * timeout);
    }

    /*после окончания анимации появления/исчезновения подсказки
    сохраняем получившиеся в итоге свойства css
    */
    function helpAnimationEnd(){
        if (helpDiv.style.opacity==="1")
        {
            helpDiv.style.opacity="";
            backgroundDiv.style.opacity="";
            helpDiv.style.display="none";
            backgroundDiv.style.display="none";
            backgroundDiv.classList.remove("background-animate");
            helpDiv.classList.remove("helpDiv-animate");
            helpDiv.removeEventListener("animationend",helpAnimationEnd);
        }
        else {
            helpDiv.style.left="30%";
            helpDiv.style.top="10%";
            backgroundDiv.style.opacity=0.7;
            helpDiv.style.opacity=1;
            backgroundDiv.classList.remove("background-animate");
            helpDiv.classList.remove("helpDiv-animate");

        }
    }

    //сбрасываем все таймауты, счетчики и коллекции
    function reset() {
        var
            id = window.setTimeout(function() {}, 0);

        while (id != 0) {
            window.clearTimeout(id);
            id--;
        }
        count=0;numberMass=[];currentSize.top=20;currentSize.width=2;
        document.getElementById("container").innerHTML="";
    }

    function enableStartButton (){
        document.getElementById("startButton").disabled=false;
    };
});

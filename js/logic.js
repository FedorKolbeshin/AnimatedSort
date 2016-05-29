/**
 * Created by fReDDy on 26.05.2016.
 */
document.addEventListener("DOMContentLoaded",function()
{
    function currentSize(width,top){
        this.width=width;
        this.top=top;
        console.dir(this.prototype)
    }
    var count=0;
    var testMass=[];
    var currentSize=new currentSize(2,20);
    console.dir(currentSize);
    document.getElementById("button").addEventListener("click",function(){
        reset();
        generateMassive(currentSize);
        var lastNumber=document.getElementById("container").children[document.getElementsByClassName("number").length-1];
        lastNumber.addEventListener("animationend",enableStartButton);
        for (var i=0;i<document.getElementsByClassName("number").length;i++)
        {
            testMass.push(document.getElementById(i));
        }
        console.dir(testMass);
    });
    function reset() {
        var id = window.setTimeout(function() {}, 0);
        while (id != 0) {
            window.clearTimeout(id); // will do nothing if no timeout with id is present
            id--;
        }
        count=0;testMass=[];currentSize.top=20;currentSize.width=2;
        document.getElementById("container").innerHTML="";
    }
    function enableStartButton (){
        document.getElementById("clickButton").disabled=false;
    }
    document.getElementById("clickButton").addEventListener("click",sortBubble);
    console.dir(document.getElementsByClassName("number"));
    function doScaledTimeout(i,counter) {
        setTimeout(function() {
            var first = document.getElementById(i),
                second = document.getElementById(i+1);
            first.addEventListener("animationend",test);
            function test(){
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
                first.removeEventListener("animationend",test);
            }
            SetAnimationProperties("keyframes"
                , first, second);
            first.classList.remove("appear"+first.id);
            second.classList.remove("appear"+second.id);
            first.style.opacity=1;
            second.style.opacity=1;
            first.classList.add("first-animate");
            second.classList.add("second-animate");
        }, counter * 50);
    }
    function sortBubble() {
        document.getElementById("clickButton").disabled=false;
        for (var j = 0, len = document.getElementsByClassName("number").length - 1; j < len; j++) {
            var swapped = false;
            var i = 0;
            while (i < len) {
                if (+testMass[i].children[0].innerHTML > +testMass[i + 1].children[0].innerHTML) {
                    console.log("попали в ветку " + i);
                    doScaledTimeout(i, count);
                    var tmp=testMass[i];
                    testMass[i]=testMass[i+1];
                    testMass[i+1]=tmp;
                    count++;
                    swapped = true;
                }
                i++;
            }
            if (!swapped)
                break;
        }
    }

});
/**
 * Created by fReDDy on 26.05.2016.
 */
document.addEventListener("DOMContentLoaded",function()
{
    function currentSize(width,top){
        this.width=width;
        this.top=top;
    }
    var count=0;
    var testMass=[];
    var currentSize=new currentSize(2,20);
    var backDiv=document.getElementById("check");
    var helpDiv=document.getElementById("helpDiv");
    document.getElementById("help").addEventListener("click",function(){
        var keyframes=document.getElementById("keyframes").sheet.cssRules;
        helpDiv.addEventListener("animationend",animationEnd);
        keyframes[6].cssRules[0].style.opacity=0;
        keyframes[6].cssRules[1].style.opacity=0.7;
        keyframes[9].cssRules[0].style.top="-50%";
        keyframes[9].cssRules[0].style.opacity=0;
        keyframes[9].cssRules[1].style.top="10%";
        keyframes[9].cssRules[1].style.opacity=1;
        backDiv.style.display="block";
        helpDiv.style.display="block";
        backDiv.classList.add("background-animate");
        helpDiv.classList.add("popup-animate");
    });
    document.getElementById("closeHelp").addEventListener("click",function(){
        var keyframes=document.getElementById("keyframes").sheet.cssRules;
        keyframes[6].cssRules[0].style.opacity=0.7;
        keyframes[6].cssRules[1].style.opacity=0;
        keyframes[9].cssRules[0].style.top="10%";
        keyframes[9].cssRules[0].style.opacity=1;
        keyframes[9].cssRules[1].style.top="-50%";
        keyframes[9].cssRules[1].style.opacity=0;
        document.getElementById("check").classList.add("background-animate");
        document.getElementById("helpDiv").classList.add("popup-animate");
    });
    function animationEnd(){
        console.log("до-"+helpDiv.style.opacity);
        if (helpDiv.style.opacity==="1")
        {
            helpDiv.style.opacity="";
            backDiv.style.opacity="";
            helpDiv.style.display="none";
            backDiv.style.display="none";
            backDiv.classList.remove("background-animate");
            helpDiv.classList.remove("popup-animate");
            helpDiv.removeEventListener("animationend",animationEnd);
        }
        else {
            helpDiv.style.left="30%";
            helpDiv.style.top="10%";
            backDiv.style.opacity=0.7;
            helpDiv.style.opacity=1;
            backDiv.classList.remove("background-animate");
            helpDiv.classList.remove("popup-animate");

        }
    }
    [].forEach.call(document.getElementsByTagName("input"),function(item){
        item.addEventListener("keypress",function(event){
            console.dir(event);
            console.log(String.fromCharCode(event.which))
            var regExp=/[digit]?[numpad]?\d/;
            if (!regExp.test(event.code))
            {
                event.preventDefault();
                return;
            }
            item.style.backgroundColor="";
        });
    });

    document.getElementById("button").addEventListener("click",function() {
        var success = checkGenerateNumberParameters();
        if (success) {
            reset();
            console.log(+document.getElementById("appearSpeed").value/parseFloat(1000));
            generateMassive(currentSize,+document.getElementById("appearSpeed").value/parseFloat(1000));
            var lastNumber = document.getElementById("container").children[document.getElementsByClassName("number").length - 1];
            lastNumber.addEventListener("animationend", enableStartButton);
            for (var i = 0; i < document.getElementsByClassName("number").length; i++) {
                testMass.push(document.getElementById(i));
            }
        }
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
    function doScaledTimeout(i,counter,timeout) {
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
            SetAnimationProperties("keyframes", first, second, currentSize.top);
            console.log(currentSize.top+"------");
            first.classList.remove("appear"+first.id);
            second.classList.remove("appear"+second.id);
            first.style.opacity=1;
            second.style.opacity=1;
            first.classList.add("first-animate");
            second.classList.add("second-animate");
        }, counter * timeout);
    }
    function sortBubble() {
        var timeout=setSwapAnimationSpeed();
        if (+timeout==-1)
        {
            document.getElementById("swapSpeed").style.backgroundColor="rgba(255,0,0,0.5)";
            return;
        }
        document.getElementById("swapSpeed").style.backgroundColor="";
        document.getElementById("clickButton").disabled=true;
        for (var j = 0, len = document.getElementsByClassName("number").length - 1; j < len; j++) {
            var swapped = false;
            var i = 0;
            while (i < len) {
                if (+testMass[i].children[0].innerHTML > +testMass[i + 1].children[0].innerHTML) {
                    doScaledTimeout(i, count,timeout);
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
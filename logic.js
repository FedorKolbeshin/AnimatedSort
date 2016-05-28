/**
 * Created by fReDDy on 26.05.2016.
 */
document.addEventListener("DOMContentLoaded",function()
{
    var testMass=[];
    console.dir(document.getElementsByTagName("div"));
    for (var i=0;i<document.getElementsByTagName("div").length;i++)
    {
        testMass.push(document.getElementById(""+i+""));
    }
    console.dir(document.getElementsByClassName("number"));
    var count=0;
    function doScaledTimeout(i,counter) {
        setTimeout(function() {
            var first = document.getElementById(i),
                second = document.getElementById(i+1);
            first.addEventListener("animationend",test);
            function test(){
                var left=first.style.left,
                    leftID=first.id;
                first.style.left=second.style.left;
                first.id=second.id;
                second.style.left=left;
                second.id=leftID;
                first.className="";
                second.className="";
                first.removeEventListener("animationend",test);
            }
            SetAnimationProperties("keyframes"
                , first.style.left, second.style.left);
            first.className += "first-animate";
            second.className += "second-animate";
        }, counter * 2500);
    }
    sortBubble();
    function sortBubble() {
        for (var j = 0, len = document.getElementsByTagName("div").length - 1; j < len; j++) {
            var swapped = false;
            var i = 0;
            while (i < len) {
                console.log(i + " азаза лалка");
                if (+testMass[i].innerHTML > +testMass[i + 1].innerHTML) {
                    console.log("попали в ветку " + i);
                    doScaledTimeout(i, count,testMass);
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
    function SetAnimationProperties (ID,first,second){
        var counter=0;
        while (counter!=4) {
            var keyframeRules = document.getElementById(ID).sheet.cssRules[counter].cssRules;
            if (counter>1)
            {
                keyframeRules[0].style.top = "20%";
                keyframeRules[0].style.left = second;
                keyframeRules[1].style.top = "0%";
                keyframeRules[1].style.left = second;
                keyframeRules[2].style.top = "0%";
                keyframeRules[2].style.left = first;
                keyframeRules[3].style.top = "20%";
                keyframeRules[3].style.left = first;
            }
            else
            {
                keyframeRules[0].style.top = "20%";
                keyframeRules[0].style.left = first;
                keyframeRules[1].style.top = "50%";
                keyframeRules[1].style.left = first;
                keyframeRules[2].style.top = "50%";
                keyframeRules[2].style.left = second;
                keyframeRules[3].style.top = "20%";
                keyframeRules[3].style.left = second;
            }
            counter++;
        }
    }
});
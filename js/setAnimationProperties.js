/**
 * Created by fReDDy on 28.05.2016.
 */

//задаем параметры анимации появления подсказки
function setHelpAnimationProperties(keyframes,invisibleShadow,visibleShadow,invisibleHelpDiv,visibleHelpDiv,hideTop,showTop){
    keyframes[2].cssRules[0].style.opacity=invisibleShadow;
    keyframes[2].cssRules[1].style.opacity=visibleShadow;
    keyframes[3].cssRules[0].style.top=hideTop;
    keyframes[3].cssRules[0].style.opacity=invisibleHelpDiv;
    keyframes[3].cssRules[1].style.top=showTop;
    keyframes[3].cssRules[1].style.opacity=visibleHelpDiv;
}

//задаем скорость анимации свапа
function setSwapAnimationSpeed() {
    var rules = document.getElementById("keyframes").sheet.cssRules,
        timeout = +document.getElementById("swapSpeed").value;
    if (timeout<50 || isNaN(timeout))
    {
        return -1;
    }
    else {
        rules[4].style.animationDuration = timeout + "ms";
        rules[5].style.animationDuration = timeout + "ms";
        return timeout + timeout / 2;
    }
}

//задаем параметры анимации для двух конкретных элементов
function SetSwapAnimationProperties (ID,first,second,maxTop){
    var counter=0;
    while (counter!=2) {
        var keyframeRules = document.getElementById(ID).sheet.cssRules[counter].cssRules;
        if (counter>0)
        {
            setCurrentSwapRule(keyframeRules,first,second,"3%");
        }
        else
        {
            setCurrentSwapRule(keyframeRules,second,first,(maxTop+17)+"%");
        }
        counter++;
    }
}

//задаем конкретные значения для keyframe
function setCurrentSwapRule(keyframeRules,first,second,percent)
{
    for (var i=0;i<4;i++) {
        switch (i) {
            case 0:
            {
                keyframeRules[i].style.top = second.style.top;
                keyframeRules[i].style.left = second.style.left;
                break;
            }
            case 1:
            {
                keyframeRules[i].style.top = percent;
                keyframeRules[i].style.left = second.style.left;
                break;
            }
            case 2:
            {
                keyframeRules[i].style.top = percent;
                keyframeRules[i].style.left = first.style.left;
                break;
            }
            case 3:
            {
                keyframeRules[i].style.top = first.style.top;
                keyframeRules[i].style.left = first.style.left;
                break;
            }
        }
    }
}

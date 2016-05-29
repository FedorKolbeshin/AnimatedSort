/**
 * Created by fReDDy on 28.05.2016.
 */
function SetAnimationProperties (ID,first,second){
    var counter=0;
    while (counter!=4) {
        var keyframeRules = document.getElementById(ID).sheet.cssRules[counter].cssRules;
        console.dir(document.getElementById(ID));
        if (counter>1)
        {
            setCurrentRule(keyframeRules,first,second,"5%");
        }
        else
        {
            setCurrentRule(keyframeRules,second,first,"55%");
        }
        counter++;
    }
}
function setCurrentRule(keyframeRules,first,second,percent)
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

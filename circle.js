var init = function() {
    var circlePath = "";
    var middleX = 250;
    var middleY = 250;
    var radius = 250;
    var degree = -90 + 179;
    var calX = 0;
    var calY = 0;
    
    calX = middleX + radius * Math.cos(degree * (Math.PI / 180));
    calY = middleY + radius * Math.sin(degree * (Math.PI / 180));
    
    circlePath = "M " + middleX + ", " + middleY + " L " + middleX + ", " + "0" + " A " + middleX + ", " + middleY + " 0 0, 1 " + calX + ", " + calY + " z";
    
    document.querySelector(".circle-box path").setAttribute("d", circlePath);
    
}();


// http://blog.naver.com/youngchanmmm/80205139615
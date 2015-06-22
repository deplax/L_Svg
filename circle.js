var init = function() {
    var circlePath = "";
    var middleX = 250;
    var middleY = 250;
    var radius = 250;
    var degree = -90 + 30;
    var calX = 0;
    var calY = 0;
    
    calX = middleX + radius * Math.cos(degree * (Math.PI / 180));
    calY = middleY + radius * Math.sin(degree * (Math.PI / 180));
    
    circlePath = "M " + middleX + ", " + middleY + " L " + middleX + ", " + "0" + " A " + middleX + ", " + middleY + " 0 0, 1 " + calX + ", " + calY + " z";
    
    document.querySelector(".circle-box path").setAttribute("d", circlePath);
    
}();


// http://blog.naver.com/youngchanmmm/80205139615

// 행사용 조작가능한 돌림판을 만들자.

// 리스트에 항목, 가중도를 넣으면 돌림판이 생성된다.

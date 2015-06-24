// http://blog.naver.com/youngchanmmm/80205139615

// startDegree, endDegree -> drawPath
// 먼저 리스트를 받아야 해.

// drawPiece(startDegree, endDegree);
// drawText(startDegree, endDegree);
// addPiece(itemName, weight);



function Piece() {
    this.radius = 250;
    this.middleX = 250;
    this.middleY = 250;

    this.endArcX;
    this.endArcY;

    this.color;
    this.startDegree;
    this.endDegree;
    this.text;

    this.pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    this.textElement = document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.parent;
}

Piece.prototype.initialize = function (parent, data) {
    this.setParent(parent);
    this.setData(data);
    this.setColor();
}

Piece.prototype.setParent = function (parent) {
    this.parent = parent;
}

Piece.prototype.setColor = function () {
    this.pathElement.style.fill = "rgb(" + rand(0, 255) + ", " + rand(0, 255) + ", " + rand(0, 255) + ")"
}

Piece.prototype.setData = function (data) {
    this.text = data.name;
    this.startDegree = data.startDegree;
    this.endDegree = data.endDegree;
}

Piece.prototype.drawPiece = function () {
    // 부채꼴의 시작위치를 12시로 하기 위하여 90을 뺀다.
    this.startDegree = this.startDegree - 90;
    this.endDegree = this.endDegree - 90;

    var startX = this.middleX + this.radius * Math.cos(this.startDegree * (Math.PI / 180));
    var startY = this.middleY + this.radius * Math.sin(this.startDegree * (Math.PI / 180));
    var endX = this.middleX + this.radius * Math.cos(this.endDegree * (Math.PI / 180));
    var endY = this.middleY + this.radius * Math.sin(this.endDegree * (Math.PI / 180));

    // 180도가 넘어갈 경우 호가 바깥쪽으로 잡혀야 한다.
    var inOut = 0;
    if ((this.endDegree - this.startDegree) > 180)
        inOut = 1;

    var circlePath = "M " + this.middleX + ", " + this.middleY + " L " + startX + ", " + startY + " A " + this.middleX + ", " + this.middleY + " 0 " + inOut + ", 1 " + endX + ", " + endY + " z";

    this.pathElement.setAttribute("d", circlePath);
    this.parent.appendChild(this.pathElement);
};

Piece.prototype.drawText = function () {

    // 중앙에 위치하도록 정리
    var degree = (this.endDegree - this.startDegree) / 2 - 90;
    // 시작 위치를 더해준다.
    var degree = degree + this.startDegree + 90;
    // 그릴 위치를 지정해준다.
    var positionX = this.middleX + (this.radius / 2) * Math.cos(degree * (Math.PI / 180));
    var positionY = this.middleY + (this.radius / 2) * Math.sin(degree * (Math.PI / 180));

    this.textElement.setAttribute("x", positionX);
    this.textElement.setAttribute("y", positionY);
    this.textElement.setAttribute("fill", "black");
    this.textElement.setAttribute("transform", "rotate(" + degree + " " + positionX + ", " + positionY + ")");
    this.textElement.innerHTML = this.text;
    this.parent.appendChild(this.textElement);
};

// ---------------------------------------------------

var drawList = function () {
    var parent = document.querySelector(".list-area");
    var list = parent.children;
    var listLen = list.length;
    for (var j = 0; j < listLen; j++) {
        parent.removeChild(list[0]);
    };

    for (var i = 0; i < pieces.length; i++) {
        var elementSpan = document.createElement("span");
        var elementButton = document.createElement("button");
        elementButton.innerHTML = "삭제";

        (function () {
            elementButton.addEventListener("click", function () {
                var elbtn = this.parentNode;
                for (var j = 0; j < parent.children.length; j++) {
                    if (elbtn === parent.children[j]) {
                        parent.removeChild(elbtn);
                        pieces.splice(j, 1);

                        itemBox = new ItemBox();
                        itemBox.calcDegree();
                        draw();
                    }
                }
            });
        })();


        var elementDiv = document.createElement("Div");
        elementDiv.appendChild(elementSpan);
        elementDiv.appendChild(elementButton);

        elementSpan.innerHTML = pieces[i].name;
        parent.appendChild(elementDiv);
    };
};

function ItemBox() {
    this.item = document.querySelector("#item").value;
    this.weight = document.querySelector("#areaSize").value;

};

ItemBox.prototype.addItem = function () {
    if (item === "")
        return;
    if (this.weight === "")
        this.weight = 1;

    var dummyItem = {
        name: "",
        weight: 0,
        startDegree: 0,
        endDegree: 0
    };

    dummyItem.name = this.item;
    dummyItem.weight = this.weight;
    pieces.push(dummyItem);

    drawList();
};

ItemBox.prototype.calcDegree = function () {
    var weightSum = 0;
    var startDegree = 0;
    for (var i = 0; i < pieces.length; i++) {
        weightSum = Number(weightSum) + Number(pieces[i].weight);
    };
    var unit = 360 / weightSum;

    for (var i = 0; i < pieces.length; i++) {
        pieces[i].startDegree = startDegree;
        pieces[i].endDegree = startDegree + unit * Number(pieces[i].weight);
        startDegree = pieces[i].endDegree;
    };
}

// --------------------------------------------------

var draw = function () {
    var parent = document.querySelector(".circle-box");
    for (var i = 0; i < pieces.length; i++) {
        var piece = new Piece();
        piece.initialize(parent, pieces[i]);
        piece.drawPiece();
        piece.drawText();
    }
}

var itemAdd = function () {
    itemBox = new ItemBox();
    itemBox.addItem();
    itemBox.calcDegree();
    draw();
}

var pieces = [];
var setting = function () {

    //DummyData
    var dummyItem01 = {
        name: "사탕",
        weight: 2,
        startDegree: 0,
        endDegree: 0
    };
    var dummyItem02 = {
        name: "초콜렛",
        weight: 3,
        startDegree: 0,
        endDegree: 0
    };
    var dummyItem03 = {
        name: "햄버거",
        weight: 1,
        startDegree: 0,
        endDegree: 0
    };
    var dummyItem04 = {
        name: "커피",
        weight: 2,
        startDegree: 0,
        endDegree: 0
    };
    var dummyItem05 = {
        name: "쥬스",
        weight: 1,
        startDegree: 0,
        endDegree: 0
    };
    pieces.push(dummyItem01);
    pieces.push(dummyItem02);
    pieces.push(dummyItem03);
    pieces.push(dummyItem04);
    pieces.push(dummyItem05);
    itemBox = new ItemBox();
    itemBox.calcDegree();
    draw();


    // 아이템 추가
    document.querySelector("#add").addEventListener("click", function (e) {
        itemAdd();
    });

    // 회전 시작
    document.querySelector("#spin").addEventListener("click", function (e) {
        //        var degree = rand(0, 10000);
        //        document.querySelector(".circle-box").style.transform = "rotate(" + degree + "deg)";

        //document.querySelector(".circle-box").classList.add("rotating");
        var circle = document.querySelector(".circle-box");
        //circle.style.animation = "rotating 0.5s linear infinite";
        var sec = 2;

        // 0.1초 마다 0.1씩 줄어든다.
        startSpin(circle, sec);
    });


    // 정지
    document.querySelector("#stop").addEventListener("click", function (e) {
        // 현재 각도를 구하기 위해 컴퓨팅된 메트릭스를 가져와서 계산.
        var el = document.querySelector(".circle-box");
        var st = window.getComputedStyle(el, null);
        var tr = st.getPropertyValue("transform");
        var values = tr.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        var c = values[2];
        var d = values[3];

        var scale = Math.sqrt(a * a + b * b);
        var sin = b / scale;
        var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));

        // 회전 클래스를 제거하고 마지막 위치를 보여준다.
        el.style.animation = "";
        el.classList.remove("transition");
        el.style.transform = "rotate(" + angle + "deg)";
        angle += 360 * 8;
        // 실행시점 문제로 setTimeout이 필요했다.
        setTimeout(function () {
            el.classList.add("transition");
            el.style.transform = "rotate(" + angle + "deg)";
        }, 0);
    });
}();

// -------------------------------------------------------
function rand(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
};

function startSpin(circle, sec) {
    if(sec < 0.2)
        return;
    circle.style.animation = "rotating " + sec + "s linear infinite";
    setTimeout(function () {
        console.log(0);
        sec = sec - 0.01;
        startSpin(circle, sec);
    }, 10);
};

document.onkeydown = function(e) {
    console.log(e.keyCode);
    switch (e.keyCode) {
        case 37:
            alert('left');
            break;
        case 38:
            alert('up');
            break;
        case 39:
            alert('right');
            break;
        case 40:
            alert('down');
            break;
    }
};


// 기본 데이터. *

// 예외처리 메세지 보여줄 것
// weight를 regix를 사용하여 숫자만 거를 것.
// add 후에 필드를 지워줄 것.

// 무한회전. *
// 랜덤 스탑. *
// 천천히 빨라지도록
// 지정 스탑.
// 스킨 씌우기.
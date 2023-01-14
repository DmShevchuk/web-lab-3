let canvas = document.getElementById("c1");
let ctx = canvas.getContext('2d');
let p = Math.PI;
let myColor = "dodgerblue";
ctx.lineWidth = 3;
let coordX
let coordY
let myX,myY
const canvasWidth = canvas.clientWidth;
const canvasHeight = canvas.clientHeight;
let arr = []
frame(myColor);

function frame(myColor) {
    arc(myColor);
    triangle(myColor);
    rect(myColor);
    ctx.beginPath();
    ctx.strokeStyle = "black";
    ctx.moveTo(0, 175);
    ctx.lineTo(350, 175);
    ctx.stroke();
    ctx.moveTo(175, 0);
    ctx.lineTo(175, 350);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.moveTo(95, 171);
    ctx.lineTo(95, 179);
    ctx.stroke();
    ctx.moveTo(15, 171);
    ctx.lineTo(15, 179);
    ctx.stroke();
    ctx.moveTo(255, 171);
    ctx.lineTo(255, 179);
    ctx.stroke();
    ctx.moveTo(335, 171);
    ctx.lineTo(335, 179);
    ctx.stroke();
    ctx.moveTo(171, 95);
    ctx.lineTo(179, 95);
    ctx.stroke();
    ctx.moveTo(171, 15);
    ctx.lineTo(179, 15);
    ctx.stroke();
    ctx.moveTo(171, 255);
    ctx.lineTo(179, 255);
    ctx.stroke();
    ctx.moveTo(171, 335);
    ctx.lineTo(179, 335);
    ctx.stroke();
    ctx.font = "15px serif";
    ctx.fillText("R/2", 95, 170);
    ctx.fillText("R/2", 255, 170);
    ctx.fillText("R/2", 179, 95);
    ctx.fillText("R/2", 179, 255);
    ctx.fillText("R", 15, 170);
    ctx.fillText("R", 335, 170);
    ctx.fillText("R", 179, 335);
    ctx.fillText("R", 179, 15);
    ctx.closePath();
}

function arc(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.arc(175, 175, 160, 0, p / 2, false);
    ctx.lineTo(175, 175);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function triangle(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.lineWidth = 3;
    ctx.moveTo(175, 15);
    ctx.lineTo(335, 175);
    ctx.lineTo(175, 175);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
}

function rect(color) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = 3;
    ctx.fillRect(15, 255, 160, -80);
}

function drawCoord(points,r) {
    let x = points.x
    let y = points.y
    let indent = 160 / r;
    coordX = 175 + x * indent;
    coordY = 175 + -y * indent;
    ctx.fillStyle = "#32CD32";
    ctx.fillRect(coordX-5, coordY-5, 5, 5);
    ctx.stroke();
}
function updateCanvas(points, r){
    ctx.clearRect(0,0,350,350)
    frame(myColor)
    for (let i = 0; i < arr.length; i++) {
        drawCoord(arr[i], r)
    }
    drawCoordWithLine(points,r)
    arr.push(points)
}
function drawCoordWithLine(points,r){
    let x = points.x
    let y = points.y
    let indent = 160 / r;
    coordX = 175 + x * indent;
    coordY = 175 + -y * indent;
    ctx.beginPath();
    ctx.fillStyle = "red";
    ctx.fillRect(coordX-5, coordY-5, 7, 7);
    ctx.closePath();
    ctx.beginPath();
    ctx.strokeStyle= "red";
    ctx.moveTo(175,175)
    ctx.lineTo(coordX, coordY);
    ctx.stroke();
}
canvas.onmousemove = function (event){
    myX = event.offsetX;
    myY = event.offsetY;
}
canvas.onclick = (e) => {
    let r = document.getElementById("form:r").value;
    document.getElementById("form:x").value =  Math.round((2 * e.offsetX / canvasWidth - 1) * r * 1.5 * 100) / 100;
    document.getElementById("form:y").value = Math.round((-2 * e.offsetY / canvasHeight + 1) * r * 1.5 * 100) / 100;
    document.getElementById("form:submit").click();
}
const canvas = document.querySelector('canvas');
const context = canvas.getContext("2d");
const width = canvas.width;
const height = canvas.height;
const scaleR = canvas.width / 3;
const arrowDeltaInPx = 8;
let RADIUS;

window.onload = function () {
    drawCanvas()
};

canvas.addEventListener('click', function (e) {
    getCursorPosition(canvas, e);
});

function changeR(radius) {
    RADIUS = radius;
    document.getElementById("r-value-label").innerHTML = "Значение R: " + RADIUS;
}

/**
 * Функция для обработки клика на canvas
 * */
function getCursorPosition(canvas, event) {
    if (RADIUS == null) {
        alert("Для начала выберите R!");
        return;
    }
    const r = RADIUS;
    const x = convertFromClickToX(event.offsetX, r);
    const y = convertFromClickToY(event.offsetY, r);
    check(x, y);
}

function check(x, y) {
    document.getElementById("graphForm:hiddenX").value = x.toFixed(4);
    document.getElementById("graphForm:hiddenY").value = y.toFixed(4);
    document.getElementById("graphForm:hiddenR").value = RADIUS;
    let btn = document.getElementById("graphForm:hidden-btn");
    btn.click();
}

function drawCanvas() {
    context.clearRect(0, 0, 400, 400);
    context.fillStyle = "#4CAF50";

// Треугольник
    context.beginPath();
    context.moveTo(width / 2, height / 2);
    context.lineTo(width / 6, height / 2);
    context.lineTo(width / 2, (height / 2) - (((width / 2) / 3) * 2));
    context.fill();

// Круг
    context.beginPath();
    context.arc(width / 2, height / 2, height / 6, -Math.PI / 2, 0, false);
    context.lineTo(width / 2, height / 2)
    context.fill();

// Прямоугольник
    context.beginPath();
    context.rect(width / 2, height / 2, width / 6, height / 3);
    context.fill();

    drawArrowOnCanvas(0, height / 2, width, height / 2);
    context.beginPath();
    context.moveTo(width, height / 2);
    context.lineTo(width - arrowDeltaInPx, (height / 2) - arrowDeltaInPx);
    context.lineTo(width - arrowDeltaInPx, (height / 2) + arrowDeltaInPx);
    context.fill();

    drawArrowOnCanvas(width / 2, height, width / 2, 0);
    context.beginPath();
    context.moveTo(width / 2, 0);
    context.lineTo((width / 2) - arrowDeltaInPx, arrowDeltaInPx);
    context.lineTo((width / 2) + arrowDeltaInPx, arrowDeltaInPx);
    context.fill();

    context.font = "lighter 13px fantasy";

// x -R
    context.beginPath();
    context.moveTo(width / 6, (height / 2) - 5);
    context.lineTo(width / 6, (height / 2) + 5);
    context.stroke();
    context.fillText("-R", width / 6, (height / 2) - 5);

// x -R/2
    context.beginPath();
    context.moveTo(width / 3, (height / 2) - 5);
    context.lineTo(width / 3, (height / 2) + 5);
    context.stroke();
    context.fillText("-R/2", width / 3, (height / 2) - 5);

// x R/2
    context.beginPath();
    context.moveTo((width / 3) * 2, (height / 2) - 5);
    context.lineTo((width / 3) * 2, (height / 2) + 5);
    context.stroke();
    context.fillText("R/2", (width / 3) * 2, (height / 2) - 5);

// x R
    context.beginPath();
    context.moveTo((width / 6) * 5, (height / 2) - 5);
    context.lineTo((width / 6) * 5, (height / 2) + 5);
    context.stroke();
    context.fillText("R", (width / 6) * 5, (height / 2) - 5);

// y R
    context.beginPath();
    context.moveTo((width / 2) - 5, height / 6);
    context.lineTo((width / 2) + 5, height / 6);
    context.stroke();
    context.fillText("R", width / 2 + 10, height / 6);

// y R/2
    context.beginPath();
    context.moveTo(width / 2 - 5, height / 3);
    context.lineTo(width / 2 + 5, height / 3);
    context.stroke();
    context.fillText("R/2", width / 2 + 10, height / 3);

// y -R/2
    context.beginPath();
    context.moveTo(width / 2 - 5, (height / 3) * 2);
    context.lineTo(width / 2 + 5, (height / 3) * 2);
    context.stroke();
    context.fillText("-R/2", width / 2 + 10, (height / 3) * 2);

// y -R
    context.beginPath();
    context.moveTo(width / 2 - 5, (height / 6) * 5);
    context.lineTo(width / 2 + 5, (height / 6) * 5);
    context.stroke();
    context.fillText("-R", width / 2 + 10, (height / 6) * 5);

    drawArrowOnCanvas();
    drawDots();
}

function drawArrowOnCanvas(fromX, fromY, toX, toY) {
    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(fromX, fromY);
    context.lineTo(toX, toY);
    context.lineWidth = 2;
    context.stroke();
}

/**
 * Сконвертировать координату клика мыши X
 * */
function convertFromClickToX(x, r) {
    return (x - width / 2) / scaleR * r;
}


/**
 * Сконвертировать координату клика мыши Y
 * */
function convertFromClickToY(y, r) {
    return (height / 2 - y) / scaleR * r;
}

/**
 * Сконвертировать координату X в координату клика мыши
 * */
function convertFromXtoClick(x, r) {
    return (x / r * scaleR + width / 2);
}

/**
 * Сконвертировать координату Y в координату клика мыши
 * */
function convertFromYtoClick(y, r) {
    return (-y / r * scaleR + height / 2);
}

/**
 * Нарисовать все выстрелы
 * */
function drawDot(x, y, r, color) {
    let xCoord = convertFromXtoClick(x, r);
    let yCoord = convertFromYtoClick(y, r);

    context.fillStyle = color;
    context.beginPath();
    context.arc(xCoord, yCoord, 3, 0, 2 * Math.PI, false);
    context.lineTo(xCoord, yCoord)
    context.fill();
}

function drawDots() {
    let table = document.getElementById("result-table-body");

    for (let i = 1; i < table.rows.length; i++) {
        let tableX = parseFloat(table.rows[i].cells[0].innerText);
        let tableY = parseFloat(table.rows[i].cells[1].innerText);

        let radius;

        if(RADIUS === undefined){
            radius = parseInt(table.rows[i].cells[2].innerText);
        }else{
            radius = RADIUS;
        }

        let color = isHit(tableX, tableY, radius) ? "green" : "red";
        drawDot(tableX, tableY, radius, color);
    }

}

function isHit(x, y, r) {
    return (x >= 0 && y >= 0 && ((x * x) + (y * y) <= ((r * r) / 4)))
        || (x >= 0 && y <= 0 && (x <= (r / 2)) && (y > -r))
        || (x <= 0 && y >= 0 && (-x + y) <= r);
}


drawCanvas();
drawDots();
setInterval(drawCanvas, 200);
setInterval(drawDots, 200);
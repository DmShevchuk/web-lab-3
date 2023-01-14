let xField = document.getElementById("x-input");
let xChosen = false;

xField.addEventListener('keyup', function (e) {
    let x;
    try {
        x = parseFloat(x);
        xChosen = x >= -5.0 && x <= 3.0;
    }catch (error){
        xChosen = false;
    }
});
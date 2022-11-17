class snakeclass {
    constructor(positionsx,positionsy){
        this.positionsx = positionsx;
        this.positionsy = positionsy;
    }
}

function PointToCoords(x,y) {
    Drawrectangle(x*10,y*10,10,10); 
}
function PointToGray(x,y) {
    DrawBG(x*10,y*10,10,10); 
}
function PointToApple(x,y) {
    DrawApple(x*10,y*10,10,10); 
}


let snake = new snakeclass([23,24,25],[24,24,24])
let pressedkey = 'd';

let apple = [[0,0]];
let score = 0

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

function Start(){
ctx.beginPath();
ctx.rect(0, 0, window.innerWidth, window.innerHeight);
ctx.fillStyle = "gray";
ctx.fill();
ctx.closePath();
setInterval(gameLoop, 80);
}

function DrawApple() {
    let a = Math.floor(Math.random() * 50);
    let b = Math.floor(Math.random() * 50);
    apple = [[a,b]]
    ctx.beginPath();
    ctx.rect(a*10, b*10, 10, 10);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function DrawBG(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.rect(x1, y1, x2, y2);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}

function Drawrectangle(x1,y1,x2,y2) {
    ctx.beginPath();
    ctx.rect(x1, y1, x2, y2);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.closePath();
}

function DrawSnake() {
    let arr = snake.positionsx;
    let arr2 = snake.positionsy;
    for (let i = 0; i < arr.length; i++) {
        PointToGray(arr[i],arr2[i]);
    }
}

function DeleteSnake() {
    let arr = snake.positionsx;
    let arr2 = snake.positionsy;
    for (let i = 0; i < arr.length; i++) {
        PointToCoords(arr[i],arr2[i]);
    }
}

function Movement(key) {
    let arrx = snake.positionsx
    let arry = snake.positionsy
    switch (key) {
        case 'w':
            arrx.shift();
            arry.shift();
            arry.push(arry[arry.length-1]-1)
            arrx.push(arrx[arrx.length-1])
            break;
        case 'a':
            arrx.shift();
            arry.shift();
            arry.push(arry[arry.length-1])
            arrx.push(arrx[arrx.length-1]-1)
            break;

        case 's':
            arrx.shift();
            arry.shift();
            arry.push(arry[arry.length-1]+1)
            arrx.push(arrx[arrx.length-1])
            break;

        case 'd':
            arrx.shift();
            arry.shift();
            arry.push(arry[arry.length-1])
            arrx.push(arrx[arrx.length-1]+1)
            break;

        default:
            break;
    }
    snake.positionsx = arrx;
    snake.positionsy = arry;
    CheckBorder();
    CheckCollisionWithSelf();
}

function GetInput() {
        document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        let newpressedkey = charStr;
        switch (newpressedkey) {
            case 'w':
                if (pressedkey === 's') {
                    return
                }
                break;
            case 's':
                if (pressedkey === 'w') {
                    return
                }
                break;
            case 'd':
                if (pressedkey === 'a') {
                    return
                }
                break;
            case 'a':
                if (pressedkey === 'd') {
                    return
                }
                break;

            default:
                break;
        }
        pressedkey = newpressedkey;
        setTimeout(100);
    };
}

function CheckBorder() {
    let headx = snake.positionsx[snake.positionsx.length-1];
    let heady = snake.positionsy[snake.positionsy.length-1];
    if (headx < 0 || headx > 50 || heady < 0 || heady > 50 ) {
        alert('OUT!!')
    }
}

function CheckCollisionWithSelf() {
    arrayx = snake.positionsx
    arrayy = snake.positionsy
    for (let i = 0; i < arrayy.length-1; i++) {
        if (arrayx[i] == arrayx[arrayx.length-1] && arrayy[i] == arrayy[arrayy.length-1]){
            alert('OUT!!');
        }
    }
}

function CheckCollisionWithApple() {
    arrayx = snake.positionsx;
    arrayy = snake.positionsy;
    if (apple[0][0] === arrayx[arrayx.length-1] && apple[0][1] === arrayy[arrayy.length-1]){
        lengthen();
        DrawApple();
    }
}

function lengthen(){
    score++;
    let arrx = snake.positionsx;
    let arry = snake.positionsy;
    arrx.push(apple[0][0]);
    arry.push(apple[0][1]);
    snake.positionsx = arrx;
    snake.positionsy = arry;
}

Start()
DrawApple();
console.log(snake.positionsx)
function gameLoop() {
    CheckCollisionWithApple();
    DrawSnake();
    Movement(pressedkey);
    DeleteSnake();
    GetInput();
}
var button = document.getElementById('button');
button.addEventListener('click',reset);
var select = document.getElementById('select');
select.addEventListener('click',selectTurn)
//variables to get canvas
var paper = document.getElementById('canvas');
var canvas = paper.getContext('2d');
var pepito = paper.addEventListener('click', game);
//variables for tic tac toe's squares
var circle = {
    url: './images/o.png',
    spaces: new Array()
}
var equis = {
    url: './images/x.png',
    spaces: new Array()
}
//extra variables
var p = document.getElementById('win');
var victory = false;
circle.image = new Image();
circle.image.src = circle.url;
equis.image = new Image();
equis.image.src = equis.url;
var y;
var x;
var start = false;
var turno = 0; // Initial Turn
var turn; //Turn by button 
var free = Array(9).fill(true) //Array for each square's availability 
var tie = 0; //if tie is 9 it means a current tie

//drawing the Tic Tac Toe Lines
drawBoard();

function selectTurn(){
    if(select.value == 'circle'){
        turn = 0;
        if(!start){
            turno = 0;
        }
    }
    if(select.value == 'cross'){
        turn = 1
        if(!start){
            turno = 1;
        }
    }
    else{

    }
}
function game(a) {
    start = true;
    //getting coordinates from canvas
    x = a.offsetX;
    y = a.offsetY;
    //each condition represents the coordinates for each square
    if (x >= 0 & x < 201 & y >= 0 & y < 201) {
        drawMichi(0, 0, 0);
    }
    if (x > 201 & x < 402 & y >= 0 & y < 201) {
        drawMichi(201, 0, 1);
    }
    if (x > 402 & x <= 602 & y >= 0 & y < 201) {
        drawMichi(402, 0, 2);
    }
    if (x >= 0 & x < 201 & y > 201 & y < 402) {
        drawMichi(0, 201, 3);
    }
    if (x > 201 & x < 402 & y > 201 & y < 402) {
        drawMichi(201, 201, 4);
    }
    if (x > 402 & y <= 602 & y > 201 & y < 402) {
        drawMichi(402, 201, 5);
    }
    if (x >= 0 & x < 201 & y > 402 & y <= 602) {
        drawMichi(0, 402, 6);
    }
    if (x > 201 & x < 402 & y > 402 & y <= 602) {
        drawMichi(201, 402, 7);
    }
    if (x > 402 & y <= 602 & y > 402 & y <= 602) {
        drawMichi(402, 402, 8);
    }
}

//this function is in charge of drawing the simbol and verifying its just one on each square
function drawMichi(x, y, square) {
    if (turno & free[square]) {
        canvas.drawImage(equis.image, x, y)
        equis.spaces[square] = true;
        turno = 0;
        console.log(equis.spaces);
        winningConditions(equis, 'X')
    }
    else if (!turno & free[square]) {
        canvas.drawImage(circle.image, x, y)
        circle.spaces[square] = true;
        turno = 1;
        console.log(circle.spaces);
        winningConditions(circle, 'Circle');
    }
    else if (tie == 9 & !victory) {
        alert("That's a tie!, Restart the game to choose a slot")
    }
    else if (victory) {
        alert('Someone has already won');
    }
    else if (!free[square]) {
        alert('Choose another slot');
    }
    free[square] = false;
    if (tie < 9 & !victory) {
        tie += 1;
    }
    if (tie == 9) {
        p.innerHTML = 'tie';
    }
}
//this function works with the previous ones, detects if someone won in order to finish the game
function winningConditions(player, name) {
    if (player.spaces[0] & player.spaces[1] & player.spaces[2] ||
        player.spaces[0] & player.spaces[3] & player.spaces[6] ||
        player.spaces[0] & player.spaces[4] & player.spaces[8] ||
        player.spaces[1] & player.spaces[4] & player.spaces[7] ||
        player.spaces[2] & player.spaces[4] & player.spaces[6] ||
        player.spaces[2] & player.spaces[5] & player.spaces[8] ||
        player.spaces[3] & player.spaces[4] & player.spaces[5] ||
        player.spaces[6] & player.spaces[7] & player.spaces[8]) {
        win(name);
    }
}
function win(winner) {
    p.innerHTML = winner + ' won the game';
    for (e in free) {
        free[e] = false;
    }
    victory = true;
}
function reset(){   
    tie = 0;
    victory = false;
    turno = turn;
    p.innerHTML = 'To restart the game hit the New Game button<br>Hope you enjoy this';
    for(z in free){
        equis.spaces[z] = NaN;
        circle.spaces[z] = NaN;
        free[z] = true;
        console.log(equis.spaces)
        console.log(circle.spaces)
    }
    canvas.clearRect(0,0,paper.width,paper.height);
    drawBoard();
    select.value = 'hidden';
}
function drawBoard(){
    draw(canvas, 'black', 1, 201, 0, 201, 602);
    draw(canvas, 'black', 1, 402, 0, 402, 602);
    draw(canvas, 'black', 1, 0, 201, 602, 201);
    draw(canvas, 'black', 1, 0, 402, 602, 402);

}
function draw(context, color, width, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = color;
    context.lineWidth = width;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath;

}

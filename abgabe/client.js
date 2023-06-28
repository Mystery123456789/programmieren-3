function main (){
    const socket = io();

    function openMatrix(matrixdata){
    // zeichne diese Matrix
    matrix = matrixdata;
    
    }
    socket.on('send matrix', openMatrix)
}

main();

let matrix = []
let side = 10
let fr = 5
function setup(){
    createCanvas(510, 510);
    background("#acacac")
    frameRate(fr);
}
function draw(){
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
           const element = matrix[y][x];
           if (element == 1) {
              fill("green")
           }
           else if (element == 0) {
              fill("white")
           }
           else if (element == 2) {
              fill("yellow")
           }
           else if (element == 3) {
              fill("red")
           }
           else if (element == 4) {
              fill("black")
           }
           else if (element == 5) {
              fill("darkgreen")
           }
           rect(x * side, y * side, side, side)
        }
     }
}
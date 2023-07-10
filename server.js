const Grass = require("./grass");
const Grazer = require("./grazer");
const Predator = require("./predator");
const Haus = require("./haus");
const Vernichter = require("./vernichter");

const random = require("./utils");

const express = require("express");
const { ALL } = require("dns");
const app = express();
let server = require("http").Server(app);
const io = require("socket.io")(server);

app.use(express.static("./"));
app.get("/", function(req, res){
    res.redirect("client.html");
})




matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 0]


];


grassArr = [];
grazerArr = [];
PredatorArr = [];
hausArr = [];
VernichterArr = [];

winter = true;
summer = false;
winterCount = 60;
summerCount = 0;
winterCountdown = 60;
summerCountdown = 60;






function randomMatrix(h,b){
    let matrix = [];

    for(let i = 0; i < h; i++){
        matrix.push([]);
        for(let l = 0; l < b; l++){
            let c = Math.floor(Math.random()* 50);
            if (c <= 20){
                matrix[i].push(0);
            } else if (c <= 50){
                matrix[i].push(1);
            }
        }
    }
    for (let i = 0; i < matrix.length * 1.5; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 2;
    }
    for (let i = 0; i < matrix.length * 1.5; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 3;
    }
    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 4;
    }
    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(Math.random() * (matrix.length - 1))][Math.floor(Math.random() * (matrix[0].length - 1))] = 5;
    }


    console.log(matrix);

    return matrix;
}



function initGame(){

    matrix = randomMatrix(30,30);

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if (matrix[y][x] === 1){
                let GrassObj = new Grass(x,y);
                grassArr.push(GrassObj);
            } else if (matrix[y][x] === 2){
                let grazerObj = new Grazer(x,y);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] === 3){
                let PredatorObj = new Predator(x,y);
                PredatorArr.push(PredatorObj);
            } else if (matrix[y][x] === 4){
                let hausObj = new Haus(x,y);
                hausArr.push(hausObj);
            } else if (matrix[y][x] === 5){
                let VernichterObj = new Vernichter(x,y);
                VernichterArr.push(VernichterObj);
            }
        }
    }
}

function updateGame(){

    matrix = matrix;
    
    while(grassArr.length < 6){
        let y = Math.floor(Math.random() * (matrix.length - 1));
        let x = Math.floor(Math.random() * (matrix[0].length - 1));
        matrix[y][x] = 1;
        if (matrix[y][x] === 1){
            let GrassObj = new Grass(x,y);
            grassArr.push(GrassObj);
        }
    }


    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        grassObj.mul();
    }
    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        grazerObj.eat();
        grazerObj.mul();
        grazerObj.die();
        
    }

    for (let i = 0; i < PredatorArr.length; i++) {
        let PredatorObj = PredatorArr[i];
        PredatorObj.eat();
        PredatorObj.mul();
        PredatorObj.die();
        
    }

    for (let i = 0; i <  VernichterArr.length; i++) {
        let  VernichterObj =  VernichterArr[i];
         VernichterObj.eat();
         VernichterObj.die();

        
    }

    winterCount++;
    summerCount++;
    if(winterCount >= 60){
        winter = true;
        winterCountdown--;
        if(winterCountdown == 0){
            winterCount = 0;
            winter = false;
            winterCountdown = 60;
        }
    } 
    if(summerCount >= 60){
        summer = true;
        summerCountdown--;
        if(summerCountdown == 0){
            summerCount = 0;
            summer = false;
            summerCountdown = 60;
        }
    }
}



server.listen(3000, function(){
    console.log("Server gestartet! Port 3000!");

})

io.on('connection', function(socket){
    console.log("ws connection established", io.engine.clientsCount);


    if(io.engine.clientsCount == 1){
        initGame();
        socket.emit("init matrix", matrix);
        setInterval(function(){
            updateGame(); 
            io.sockets.emit("send matrix", matrix);
            io.sockets.emit("winter",winter);
            io.sockets.emit("summer",summer);
            console.log(summer,winter);
        }, 1000)
    } else {
        socket.emit("init matrix", matrix);
    }

    //callbacks for client messages
    function killGrass(data){
        console.log("Data received, kill ", + data);
        //kill Grass
        for(let i = grassArr.length - 1; i >= 0; i--){
            let x = grassArr[i].x;
            let y = grassArr[i].y;
            matrix[y][x] = 0;
        }
        grassArr = [];
        io.sockets.emit("send matrix", matrix);
        console.log(grassArr);
    }
    function killGrazer(data){
        console.log("Data received, kill ", + data);
        //kill Grazer
        for(let i = grazerArr.length - 1; i >= 0; i--){
            let x = grazerArr[i].x;
            let y = grazerArr[i].y;
            matrix[y][x] = 0;
        }
        grazerArr = [];
        io.sockets.emit("send matrix", matrix);
        console.log(grazerArr);
    }
    function killPredator(data){
        console.log("Data received, kill ", + data);
        //kill Predator
        for(let i = PredatorArr.length - 1; i >= 0; i--){
            let x = PredatorArr[i].x;
            let y = PredatorArr[i].y;
            matrix[y][x] = 0;
        }
        PredatorArr = [];
        io.sockets.emit("send matrix", matrix);
        console.log(PredatorArr);
    }

    socket.on("kill Grass", killGrass)
    socket.on("kill Grazer", killGrazer)
    socket.on("kill Predator", killPredator)

})
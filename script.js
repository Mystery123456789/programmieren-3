let matrix = [
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




let p = 10;

let fr = 10;

function randomMatrix(h,b){
    let matrix = [];

    for(let i = 0; i < h; i++){
        matrix.push([]);
        for(let l = 0; l < b; l++){
            let b = random(-100,20);
            if (b <= -50){
                matrix[i].push(0);
            } else if (b <= 20){
                matrix[i].push(1);
            }
        }
    }
    for (let i = 0; i < matrix.length / 5; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 2;
    }

    for (let i = 0; i < matrix.length / 5; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 3;
    }

    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 4;
    }
    for (let i = 0; i < matrix.length * 1.25; i++){
        matrix[Math.floor(random(0, matrix.length - 1))][Math.floor(random(0, matrix[0].length - 1))] = 5;
    }


    console.log(matrix);

    return matrix;
}

/*function randomMatrix(h,b){
    let matrix = [];
    let v = 7;

    for(let i = 0; i < h; i++){
        matrix.push([]);
        for(let l = 0; l < b; l++){
            if (l == v){
                d = 1;
                matrix[i].push(d);
            } else {
                d = 0;
                matrix[i].push(d);
            }
        }
        v -= 1;
    }
    console.log(matrix);

    return matrix;
}*/





/*function randomMatrix(h,b){
    let matrix = [];
    let g = 1;

    for(let i = 0; i < h; i++){
        matrix.push([]);
        for(let l = 0; l < b; l++){
            if (g % 2 == 0){
                d = 1;
                matrix[i].push(d);
            } else {
                d = 0;
                matrix[i].push(d);
            }
            g += 1;
        }
        g += 1;
    }
    console.log(matrix);

    return matrix;
}*/


/*for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
        console.log(matrix[y][x]);
    }
}*/


//wird am Start ausgeführt
function setup(){
    frameRate(fr);

    matrix = randomMatrix(50,50);
    createCanvas(matrix[0].length * p + 1, matrix.length * p + 1);
    background(255,255,210);

    for(let y = 0; y < matrix.length; y++){
        for(let x = 0; x < matrix[y].length; x++){
            if (matrix[y][x] === 1){
                let GrassObj = new Grass(x,y);
                console.log(GrassObj);
                grassArr.push(GrassObj);
            } else if (matrix[y][x] === 2){
                let grazerObj = new Grazer(x,y);
                console.log(grazerObj);
                grazerArr.push(grazerObj);
            } else if (matrix[y][x] === 3){
                let PredatorObj = new Predator(x,y);
                console.log(PredatorObj);
                PredatorArr.push(PredatorObj);
            } else if (matrix[y][x] === 4){
                let hausObj = new Haus(x,y);
                console.log(hausObj);
                hausArr.push(hausObj);
            } else if (matrix[y][x] === 5){
                let VernichterObj = new Vernichter(x,y);
                console.log(VernichterObj);
                VernichterArr.push( VernichterObj);
            }
        }
    }





    /*let Grass1 = new Grass(1,2);
    console.log(Grass1);
    console.log(Grass1.findFields(0));
    //Grass1.markieren();*/
}

//wird perma ausgeführt
function draw(){

    for(let i = 0; i < matrix.length; i++){
        for(let x = 0; x < matrix[i].length; x++){
            if (matrix[i][x] == 0){
                fill("white");
            } else if (matrix[i][x] == 1){
                fill("green");
            } else if (matrix[i][x] == 2){
                fill("yellow");
            } else if (matrix[i][x] == 3){
                fill("red");
            } else if (matrix[i][x] == 4){
                fill("black");
            } else if (matrix[i][x] == 5){
                fill("blue");
            }
            rect(x * p, i * p, p, p);
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
        console.log(grazerArr[0]);
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
        //VernichterObj.teleport();
        VernichterObj.eat();
        VernichterObj.die();

        
    }




}

const Livingcreature = require("./Livingcreature");
const random = require("./utils");

module.exports = class Grazer extends Livingcreature{
    constructor(x,y){

        super(x,y);
        
        this.color = 2;
        this.walkingOn = 0;
        
        this.rounds1 = 0;
        this.rounds2 = 0;
        
        this.name = "Koala_hoch3";

    }

    updateDirections(){
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x    , this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]

        ];
    }


    findFields(objekt){

        this.updateDirections();

        return super.findFields(objekt);
    }


    eat(){
        let grassFields = this.findFields(1);

        if (grassFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(grassFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            //update
            this.y = newY;
            this.x = newX;

            //gras löschen
            for (let i = 0; i < grassArr.length; i++) {
                let grassObj = grassArr[i];
                if (this.x === grassObj.x && this.y === grassObj.y){
                    //löschen
                    grassArr.splice(i,1);
                    break;
                }
                
            }
            this.rounds1 += 1;
            this.rounds2 = 2;

        } else {
            this.move();
            this.rounds2 += 1;
            this.rounds1 = 1;
        }
    }

    mul(){
        if(summer){
            if (this.rounds1 === 4){
                let emptyFields = this.findFields(0); //array mit pos arrays
                if (emptyFields.length > 0){
                let randPos = random(emptyFields); // x,y
                let newX = randPos[0];
                let newY = randPos[1];
    
                let grazerObj = new Grazer(newX,newY);
                matrix[newY][newX] = 2;
                grazerArr.push(grazerObj);
                }
                this.rounds1 = 0;
    
            }
        }
        if(winter){
            if (this.rounds1 === 7){
                let emptyFields = this.findFields(0); //array mit pos arrays
                if (emptyFields.length > 0){
                let randPos = random(emptyFields); // x,y
                let newX = randPos[0];
                let newY = randPos[1];
    
                let grazerObj = new Grazer(newX,newY);
                matrix[newY][newX] = 2;
                grazerArr.push(grazerObj);
                }
                this.rounds1 = 0;
    
            }
        }
    }

    die(){
        if (this.rounds2 === 5){
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (this.x === grazerObj.x && this.y === grazerObj.y){
                    //löschen
                    matrix[grazerObj.y][grazerObj.x] = 0;
                    grazerArr.splice(i,1);
                    this.rounds2 = 0;
                    break;
                }
                
            }
        }
    }
}
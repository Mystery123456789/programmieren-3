const Livingcreature = require("./Livingcreature");
const random = require("./utils");

module.exports = class Predator extends Livingcreature{
    constructor(x,y){

        super(x,y)

        this.name = "Koala_hoch4";

        this.color = 3;
        this.walkingOn = 0;

        this.rounds1 = 0;
        this.rounds2 = 0;

        
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
        let grazerFields = this.findFields(2);

        if (grazerFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(grazerFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = 3;
            matrix[this.y][this.x] = 0;

            //update
            this.y = newY;
            this.x = newX;

            //grazers löschen
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (this.x === grazerObj.x && this.y === grazerObj.y){
                    //löschen
                    grazerArr.splice(i,1);
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
            if (this.rounds1 === 6){
                let grassFields = this.findFields(0); //array mit pos arrays
                if (grassFields.length > 0){
                let randPos = random(grassFields); // x,y
                let newX = randPos[0];
                let newY = randPos[1];
    
                let PredatorObj = new Predator(newX,newY);
                matrix[newY][newX] = 3;
                PredatorArr.push(PredatorObj);
                }
                this.rounds1 = 0;
            }
        }
        if(winter){
            if (this.rounds1 === 2){
                let grassFields = this.findFields(0); //array mit pos arrays
                if (grassFields.length > 0){
                let randPos = random(grassFields); // x,y
                let newX = randPos[0];
                let newY = randPos[1];
    
                let PredatorObj = new Predator(newX,newY);
                matrix[newY][newX] = 3;
                PredatorArr.push(PredatorObj);
                }
                this.rounds1 = 0;
            }
        }
    }

    die(){
        if (this.rounds2 === 8){
            for (let i = 0; i < PredatorArr.length; i++) {
                let PredatorObj = PredatorArr[i];
                if (this.x === PredatorObj.x && this.y === PredatorObj.y){
                    //löschen
                    matrix[PredatorObj.y][PredatorObj.x] = 0;
                    PredatorArr.splice(i,1);
                    break;
                }
                
            }
        }
    }
}
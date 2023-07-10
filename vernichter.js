const Livingcreature = require("./Livingcreature");
const random = require("./utils");

module.exports = class Vernichter extends Livingcreature{
    constructor(x,y){

        super(x,y);

        this.name = "Koala_hoch6";

        this.color = 5;
        this.walkingOn = 0;

        this.teleportCounter = 0;

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
        let hausFields = this.findFields(4);

        if (hausFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(hausFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;

            //update
            this.y = newY;
            this.x = newX;

            //haus löschen
            for (let i = 0; i < hausArr.length; i++) {
                let hausObj = hausArr[i];
                if (this.x === hausObj.x && this.y === hausObj.y){
                    //löschen
                    hausArr.splice(i,1);
                    break;
                }
                
            }
        
            this.teleportCounter ++;
        } else {
            this.move();

            this.teleportCounter ++;
        }
    }


    die(){
        let grassFields = this.findFields(1);
        if (grassFields.length >= 4){
            this.teleport();
        }
        if (grassFields.length === 0){
            for (let i = 0; i < VernichterArr.length; i++) {
                let  VernichterObj = VernichterArr[i];
                if (this.x ===  VernichterObj.x && this.y === VernichterObj.y){
                    //löschen
                    matrix[VernichterObj.y][VernichterObj.x] = 0;
                    VernichterArr.splice(i,1);
                    break;
                }
            }
        }
    }


    teleport(){
        let newX = Math.floor(Math.random() * (matrix[0].length - 1));
        let newY = Math.floor(Math.random() * (matrix.length - 1));

        //console.log(newX,newY);

        matrix[newY][newX] = 5;
        matrix[this.y][this.x] = 0;

        this.y = newY;
        this.x = newX;

        for (let i = 0; i < grassArr.length; i++) {
            let grassObj = grassArr[i];
            if (this.x === grassObj.x && this.y === grassObj.y){
                //löschen
                grassArr.splice(i,1);
                break;
            }
        }
        for (let i = 0; i < grazerArr.length; i++) {
            let grazerObj = grazerArr[i];
            if (this.x === grazerObj.x && this.y === grazerObj.y){
                //löschen
                grazerArr.splice(i,1);
                break;
            }
        }
        for (let i = 0; i < PredatorArr.length; i++) {
            let PredatorObj = PredatorArr[i];
            if (this.x === PredatorObj.x && this.y === PredatorObj.y){
                //löschen
                PredatorArr.splice(i,1);
                break;
            }
        }
        for (let i = 0; i < hausArr.length; i++) {
            let hausObj = hausArr[i];
            if (this.x === hausObj.x && this.y === hausObj.y){
                //löschen
                hausArr.splice(i,1);
                break;
            }
        }

        this.teleportCounter = 0;
        
    }
}
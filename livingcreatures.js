const random = require("./utils");

module.exports = class Livingcreature{
    constructor(x,y){


        this.x = x;
        this.y = y;

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




        let found = [];

        for(let h = 0; h < this.directions.length; h++){
            let pos = this.directions[h];
            let myX = pos[0];
            let myY = pos[1];

            //spielgrenzen-Prüfung
            if(myY >= 0 && myY < matrix.length && myX >= 0 && myX < matrix[0].length){
                //in matrix sehen
                let matrixWert = matrix[myY][myX];

                if (matrixWert === objekt){
                    found.push(pos);
                }
            }
        }
        return found;
    }
    move(){
        let grassFields = this.findFields(this.walkingOn); //array mit pos arrays
        if (grassFields.length > 0){

            //wähle zufällige Pos aus
            let randPos = random(grassFields); // x,y
            let newX = randPos[0];
            let newY = randPos[1];

            //matrix updaten
            matrix[newY][newX] = this.color;
            matrix[this.y][this.x] = this.walkingOn;

            //update
            this.y = newY;
            this.x = newX;

        }
    }
}

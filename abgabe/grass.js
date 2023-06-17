const random = require('./utils')
const LivingCreature = require('./livingCreature');
module.exports =class Grass extends LivingCreature {
    constructor(x, y) {
       super(x, y)
       this.rounds = 0
    }
 
    mul() {
       this.rounds++;
       //console.log("grass mul", this.rounds);
       // nach 6 Runden kann es sich vermehren, wenn this.rounds >= 6
       if (this.rounds >= 6) {
          // console.log("nun vermehre dich...");
          let emptyFields = this.chooseCell(0);
          // suche leere Nachbarfelder - wenn in der Liste Einträge vorhanden
          if (emptyFields.length > 0) {
             let theChosenField = random(emptyFields);
             let newX = theChosenField[0];
             let newY = theChosenField[1];
             // leeres Feld wird aus found zufällig gewählt
             // neues Grasobjekt entsteht
             let grasObj = new Grass(newX, newY);
             grassArr.push(grasObj);
             // grasobjekt sichtbar
             // update matrix
             matrix[newY][newX] = 1;
 
          }
          this.rounds = 0;
       }
    }
 }
 
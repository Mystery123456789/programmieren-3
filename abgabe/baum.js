const LivingCreature = require('./livingCreature');
module.exports =class Baum extends LivingCreature{
    constructor(x, y) {
       super(x, y)
       this.rounds = 0;
    }
 
 
    mul() {
       this.rounds++;
       if (this.rounds >= 9) {
          let emptyFields = this.chooseCell(0);
          // suche leere Nachbarfelder - wenn in der Liste Einträge vorhanden
          if (emptyFields.length > 0) {
             let theChosenField = random(emptyFields);
             let newX = theChosenField[0];
             let newY = theChosenField[1];
             // leeres Feld wird aus found zufällig gewählt
             let baumObj = new Baum(newX, newY);
             baumArr.push(baumObj);
             // update matrix
             matrix[newY][newX] = 5;
 
          }
          this.rounds = 0;
       }
    }
 }
 
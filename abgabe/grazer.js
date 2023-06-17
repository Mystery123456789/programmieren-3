const random = require('./utils')
const LivingCreature = require('./livingCreature');
module.exports =class Grazer extends LivingCreature {
    constructor(x, y) {
       super(x, y)
       this.multiply = 0;
       this.notEaten = 0;
       this.color = "yellow";
       this.index = 2;
    }
 
    // Methoden
    updateNeighbors() {
       this.neighbors = [
          [this.x - 1, this.y - 1],
          [this.x, this.y - 1],
          [this.x + 1, this.y - 1],
          [this.x - 1, this.y],
          [this.x + 1, this.y],
          [this.x - 1, this.y + 1],
          [this.x, this.y + 1],
          [this.x + 1, this.y + 1]
       ]
    }
    chooseCell(symbol) {
       this.updateNeighbors()
       return super.chooseCell(symbol)
    }
 
    move() {
       //suche nach leeren Feldern in der Nachbarschaft
       let emptyFields = this.chooseCell(0)
       if (emptyFields.length > 0) {
          //wähle ein zufälliges Feld aus der Liste mit leeren Feldern
          let newPos = random(emptyFields)// [x,y]
          let newX = newPos[0]
          let newY = newPos[1]
          //matrix updaten
          //newposition bekommt wert 2
          matrix[newY][newX] = 2
          matrix[this.y][this.x] = 0
 
          this.x = newX
          this.y = newY
       }
    }
 
    eat() {
       let grasListe = this.chooseCell(1);// Nummer = was es isst
       if (grasListe.length > 0) {
          // nun zufällig ein Grasobjekt aus Liste wählen
          let posNeighbor = random(grasListe);
          // [x, y]
          let newX = posNeighbor[0];
          let newY = posNeighbor[1];
          // 
          // matrix bekommt an neuen Pos den Wert 2
          matrix[newY][newX] = 2;
          // matrix bekann an alten Pos den wErt 0
          matrix[this.y][this.x] = 0;
          this.x = newX;
          this.y = newY;
          //grasobjekt löschen aus grassArr
          for (let i = 0; i < grassArr.length; i++) {
             let grObj = grassArr[i];
             if (this.x == grObj.x && this.y == grObj.y) {
                // jetzt löschen
                grassArr.splice(i, 1);
                break;
             }
          }
 
          this.multiply++;
          this.notEaten = 0;
       } else {
 
          this.multiply = 0;
          this.notEaten++;
 
          if (this.notEaten > 5) {
             this.die();
          } else {
             this.move();
          }
       }
    }
 
    die() {
       matrix[this.y][this.x] = 0;
       for (let i = 0; i < grazerArr.length; i++) {
          let gfObj = grazerArr[i];
          if (this.x == gfObj.x && this.y == gfObj.y) {
             grazerArr.splice(i, 1);
             break;
          }
       }
    }
 
    mul() {
       if (this.multiply >= 5) {
          // suche leere Nachbarfelder
          let emptyArr = this.chooseCell(0);
          if (emptyArr.length > 0) {
             // wähle eines zufällig aus
             let posNeighbor = random(emptyArr); // [x, y]
             let newX = posNeighbor[0];
             let newY = posNeighbor[1];
             // matrix an dieser Pos Wert 1 schreiben
             matrix[newY][newX] = 2;
             let grazerObj = new Grazer(newX, newY);
             grazerArr.push(grazerObj);
             // grasfresserObj erzeugen
          }
       }
    }
 }
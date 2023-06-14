const LivingCreature = require('./livingCreature');
module.exports =class Predator extends LivingCreature{
    constructor(x, y) {
       super(x,y)
       this.multiply = 0;
       this.notEaten = 0;
       this.color = "red";
       this.index = 3;
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
          //newposition bekommt wert 3
          matrix[newY][newX] = 3
          matrix[this.y][this.x] = 0
 
          this.x = newX
          this.y = newY
       }
 
 
 
 
    }
 
    eat() {
       let grazerListe = this.chooseCell(2);
       if (grazerListe.length > 0) {
          // nun zufällig ein Grazerobjekt aus Liste wählen
          let posNeighbor = random(grazerListe);
          // [x, y]
          let newX = posNeighbor[0];
          let newY = posNeighbor[1];
          // 
          // matrix bekommt an neuen Pos den Wert 2
          matrix[newY][newX] = 3;
          // matrix bekann an alten Pos den Wert 0
          matrix[this.y][this.x] = 0;
          this.x = newX;
          this.y = newY;
          //grazerobjekt löschen aus grazerArr
          for (let i = 0; i < grazerArr.length; i++) {
             let grazerObj = grazerArr[i];
             if (this.x == grazerObj.x && this.y == grazerObj.y) {
                // jetzt löschen
                grazerArr.splice(i, 2);
                break;
             }
          }
 
          this.multiply++;
          this.notEaten = 0;
       } else {
 
          this.multiply = 0;
          this.notEaten++;
 
          if (this.notEaten > 8) {
             this.die();
          } else {
             this.move();
          }
       }
    }
 
    die() {
       matrix[this.y][this.x] = 0;
       for (let i = 0; i < predatorArr.length; i++) {
          let predatorObj = predatorArr[i];
          if (this.x == predatorObj.x && this.y == predatorObj.y) {
             predatorArr.splice(i, 3);
             break;
          }
       }
    }
 
    mul() {
       if (this.multiply >= 3) {
          // suche leere Nachbarfelder
          let emptyArr = this.chooseCell(0);
          if (emptyArr.length > 0) {
             // wähle eines zufällig aus
             let posNeighbor = random(emptyArr); // [x, y]
             let newX = posNeighbor[0];
             let newY = posNeighbor[1];
             // matrix an dieser Pos Wert 1 schreiben
             matrix[newY][newX] = 3;
             let predatorObj = new Predator(newX, newY);
             predatorArr.push(predatorObj);
             // fleischfresserObj erzeugen
          }
       }
    }
 }
 
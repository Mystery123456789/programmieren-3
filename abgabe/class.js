class LivingCreature {
   constructor(x, y) {
      this.y = y;
      this.x = x;
      this.directions = [
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
      let found = [];
      for (let i = 0; i < this.directions.length; i++) {
         const pos = this.directions[i]; // [x, y]
         let posX = pos[0];
         let posY = pos[1];

         // check die Spielfeldgrenzen
         if (posX >= 0 && posX < matrix[0].length &&
            posY >= 0 && posY < matrix.length) {
            let wert = matrix[posY][posX];
            // wir suchen nach leeren Feldern - Wert 0
            if (wert == symbol) {
               found.push(pos);
            }
         }

      }
      return found;
   }
}
class Grass extends LivingCreature {
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





class Grazer extends LivingCreature {
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






class Predator extends LivingCreature{
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




class Allesfresser {
   constructor(x, y) {
      this.x = x;
      this.y = y;
      this.multiply = 0;
      this.notEaten = 0;
      this.color = "black";
      this.index = 4;
      this.neighbors = [
         [this.x - 1, this.y - 1],
         [this.x, this.y - 1],
         [this.x + 1, this.y - 1],
         [this.x - 1, this.y],
         [this.x + 1, this.y],
         [this.x - 1, this.y + 1],
         [this.x, this.y + 1],
         [this.x + 1, this.y + 1]
      ];
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
      let found = [];
      for (let i = 0; i < this.neighbors.length; i++) {
         const pos = this.neighbors[i]; // [x, y]
         let posX = pos[0];
         let posY = pos[1];
         if (posX >= 0 && posX < matrix[0].length &&
            posY >= 0 && posY < matrix.length) {
            if (matrix[posY][posX] == symbol) {
               found.push(pos);
            }
         }
      }
      return found;
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
         //newposition bekommt wert 4
         matrix[newY][newX] = 4
         matrix[this.y][this.x] = 0

         this.x = newX
         this.y = newY
      }
   }

   eat() {
      let grasListe = this.chooseCell(0);
      if (grasListe.length > 0) {
         // nun zufällig ein Grasobjekt aus Liste wählen
         let posNeighbor = random(grasListe);
         // [x, y]
         let newX = posNeighbor[0];
         let newY = posNeighbor[1];
         // 
         // matrix bekommt an neuen Pos den Wert 4
         matrix[newY][newX] = 4;
         // matrix bekann an alten Pos den Wert 0
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

         if (this.notEaten > 4) {
            this.die();
         } else {
            this.move();
         }
      }
   }

   die() {
      matrix[this.y][this.x] = 0;
      for (let i = 0; i < allesfresserArr.length; i++) {
         let allesfresserObj = allesfresserArr[i];
         if (this.x == allesfresserObj.x && this.y == allesfresserObj.y) {
            allesfresserArr.splice(i, 4);
            break;
         }
      }
   }


   mul() {
      if (this.multiply >= 30) {
         // suche leere Nachbarfelder
         let emptyArr = this.chooseCell(0);
         if (emptyArr.length > 0) {
            // wähle eines zufällig aus
            let posNeighbor = random(emptyArr); // [x, y]
            let newX = posNeighbor[0];
            let newY = posNeighbor[1];
            // matrix an dieser Pos Wert 1 schreiben
            matrix[newY][newX] = 4;
            let allesfresserObj = new Allesfresser(newX, newY);
            allesfresserArr.push(allesfresserObj);
         }
      }
   }
}


class Baum {
   constructor(x, y) {
      this.y = y;
      this.x = x;
      this.rounds = 0;
      this.directions = [
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
      let found = [];
      for (let i = 0; i < this.directions.length; i++) {
         const pos = this.directions[i]; // [x, y]
         let posX = pos[0];
         let posY = pos[1];

         // check die Spielfeldgrenzen
         if (posX >= 0 && posX < matrix[0].length &&
            posY >= 0 && posY < matrix.length) {
            let wert = matrix[posY][posX];
            // wir suchen nach leeren Feldern - Wert 0
            if (wert == symbol) {
               found.push(pos);
            }
         }

      }
      return found;
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

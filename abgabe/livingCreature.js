module.exports =class LivingCreature {
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
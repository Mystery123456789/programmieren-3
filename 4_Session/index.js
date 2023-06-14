/*const Square = require("./module");

function main(){
    let square = new Square(50);
    console.log(square.getArea())
}
main();*/

const fs = require('fs')

function main(){
    let file = "hello.txt";
   // fs.appendFileSync(file,"Hello world/n");
   fs.writeFile("hello.txt", "Hello world/n", function(err){console.log("fs.writeFile")
})
   
}
main();
let obj = {
   "first_name": "Max",
   "last_name": "Amogus",
   "adresses": ["street 1","adress 2","adress 3"],
   sayHello(){
      console.log("Hello", this.first_name);
   }
}
console.log(obj);
console.log(obj.first_name);
obj.sayHello();
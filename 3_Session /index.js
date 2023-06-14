const express = require("express");
const app = express();

app.use(express.static('../abgabe'));

app.get("/", function(req, res){
    res.send("<h2>Hello user....</h2>");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello" + name +"</h1>");
});
app.get("/google/:search", function(req, res){
    let search= req.params.search;
    res.redirect("http://google.de/search?q=" + search);
});

app.get("/abgabe", function(req, res){
    res.redirect("index.html");
})

app.listen(3000, function(){
    console.log("my server is running on port 3000");
});
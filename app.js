const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/'))
app.use('/css', express.static("/css"))
app.use('/imagens', express.static("/imagens"))
app.use('/grafico.js', express.static("/"))

app.get("/index.html",function(req,res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/Grafico",function(req,res){
    res.sendFile(__dirname + "/Grafico.html");
});

app.get("/grafico",function(req,res){
    res.sendFile(__dirname + "/grafico.js");
});

//app.listen(3000, function(){console.log("Server Running");});


module.exports = routers
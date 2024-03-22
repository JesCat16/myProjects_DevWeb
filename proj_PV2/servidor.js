let http = require("http");
let express = require('express');
let mongoose = require('mongoose')

let app = express();

mongoose.connect("mongodb://localhost/FraseSalva");

let modelTextoSchema = new mongoose.Schema({
    dbTexto: String
})

let modelTexto = mongoose.model('Textos', modelTextoSchema)

let textosalvo = " "
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get(['/','/home'],function (req,resp){
    resp.render('home',{textosalvo})
});

app.get("/salvartexto", function (req,resp){
    textosalvo= req.query.texto
    resp.write("Salvo com sucesso!")
    resp.end()
});

app.get("/IrparaServidor", function (req,resp){
    resp.render('SalvarNoServidor',{textosalvo})
})

app.get("/SalvarTextonoServidor", function (req,resp){
    let textoSalvoBD = req.query.textoBD

    var novo = new modelTexto({
        dbTexto: textoSalvoBD
    })
    novo.save()
    if(textoSalvoBD === textosalvo){
        resp.write("<h1>Colocado!</h1>")
        resp.write("Mesmo texto do que do site!")
        resp.end()
    }
    else{
        resp.write("Colocado!")
        resp.end()
    }
})


let server = http.createServer(app);
server.listen(80);
console.log("Servidor rodando...")

var http = require('http');
var express = require('express');
let mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/Agenda');

let agendaSchema = new mongoose.Schema({
    dbNome: 'String',
    dbEmail: 'String',
    dbTelefone: 'String'
})

let agendaModel = mongoose.model("contatos",agendaSchema)

let app = express();

app.use(express.static("./public"));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/agenda', function(req,resp){
    resp.render('NovoContato')
})

app.get('/NovoContato', function (req,resp){
    let Nome = req.query.nome
    let Email = req.query.email
    let Telefone = req.query.telefone

    let novo = new agendaModel({
        dbNome: Nome,
        dbEmail: Email,
        dbTelefone: Telefone
    })
    novo.save()
    resp.render('sucesso')
    resp.end()
})

app.get('/', function (req,resp){

    agendaModel.find(function (erro,listadeposts){
        resp.render("agenda",{contatos:listadeposts});
    });
})


let server = http.createServer(app);
server.listen(80);

console.log("Servidor rodando...");
let http = require('http');
let express = require ('express');
let mongoose = require('mongoose');

let app = express()
let textoFinal = " "

mongoose.connect("mongodb://localhost/Textos");

let modelTextoSchema = new mongoose.Schema({
    dbTexto: String
});

var modelTexto = mongoose.model('Textos', modelTextoSchema);


app.use(express.static('./public'));
app.set('view engine','ejs');

app.get('/', function (req,resp){
    resp.render('home',{textoFinal})

});
app.get('/text',function (req,resp){
    textoFinal = req.query.texto;
    resp.write("Sucesso")
    resp.end()
});

app.get('/salvarNoBD', function (req,resp){
    resp.render('salvaBD',{textoFinal})
});

app.get('/textBD', function (req,resp){
    let texto_banco_de_dados = req.query.textoBD;

    var novo = new modelTexto({
        dbTexto: texto_banco_de_dados,
    })
    novo.save();
    if(texto_banco_de_dados === textoFinal){
        resp.write('<h1>Cadastrado</h1>');
        resp.write("<h3>Mesmo texto do site!</h3>");
        resp.end();
    }
    else{
        resp.write('<h1>Cadastrado</h1>');
        resp.end();
    }

})

let server = http.createServer(app);
server.listen(80);
console.log("Servidor rodando...");
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var gol1 = {
    x:0,
    y:300,
    largura:80,
    altura:300,
    cor:"white"
}
var gol2 = {
    x:canvas.width - 80,
    y:300,
    largura:80,
    altura:300,
    cor:"white"
}
var bola = {





}
function gols(){
    ctx.fillStyle = gol1.cor
    ctx.fillRect(gol1.x,gol1.y,gol1.largura,gol1.altura)

    ctx.fillStyle = gol2.cor
    ctx.fillRect(gol2.x,gol2.y,gol2.largura,gol2.altura)
}
gols()
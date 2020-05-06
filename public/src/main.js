var jugador;
var nom = prompt("NOM: ");
var tauler;
const socket = new io();

socket.emit("nom",nom);

socket.on("jugador",(j)=>{
    jugador = j;
    alert(`Nom ${j.nom}`);
});

socket.on("partida",async (mapa)=>{
    mapaClicks = mapa;
    TOTmapaDeClicksATauler();
    jugador.torn = true;
})

socket.on("guanyador",()=>{
    
})

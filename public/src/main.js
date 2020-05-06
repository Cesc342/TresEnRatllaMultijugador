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

socket.on("guanyador",(guanyador)=>{
    if(jugador.j == guanyador){
        alert("Has guanyat!");
    }else{
        alert("Has perdut");
    }
    alert(`Ha guanyat el J${guanyador}!`);
})

socket.on("sala",(sala)=>{
    if(! (sala.j2.nom == "")){
        carregarNoms(sala.j1.nom, sala.j2.nom);
    }
})
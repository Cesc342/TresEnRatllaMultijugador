var jugador;
var nom = prompt("NOM: ");
var tauler;
const socket = new io();

socket.emit("nom",nom);

//Agafa el jugador de la DB
socket.on("jugador",(j)=>{
    jugador = j;
    alert(`Nom ${j.nom}`);
});

//Canvia de torn
socket.on("partida",async (mapa)=>{
    mapaClicks = mapa;
    TOTmapaDeClicksATauler();
    jugador.torn = true;
    mercarTorn();
})

//S'activa quan el servidor ja ha vist que ha guanyat algu
socket.on("guanyador",async (guanyador)=>{
    await agafarMapaClicks();
    if(jugador.j == guanyador){
        alert("Has guanyat!");
    }else{
        alert("Has perdut");
    }
})

//S'activa quan es connecta el segon jugador
socket.on("sala",(sala)=>{
    if(! (sala.j2.nom == "")){
        carregarNoms(sala.j1.nom, sala.j2.nom);
        mercarTorn();
    }
})
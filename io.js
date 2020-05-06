const SocketIO = require("socket.io");
const io = SocketIO();
require("colors");

const db = require("./db");
const normes = require("./normes");
var j = 1;

// Deixa entrar a persones i prepara la base de dades
// No deixa entrar si hi ha + de dos persones connectades
async function entrar(socket,nom)
{
    //Agafa base de dades i només treu el jugador triat
    await db.agafar();
    jugador = db.json.sala["j"+j];

    //Prepara el jugador per la base de dades i la passa a $db.json.sala[j1 o j2] per guardar-la
    jugador.id = socket.id;
    jugador.nom = nom;
    db.json.sala["j"+j] = jugador;

    //Guarda el jugador en la base de dades
    console.table(db.json.sala);
    await db.guardar();

    //Envia el jugador cap el client
    socket.emit("jugador",jugador);
    j++;
    console.log(`${nom.bold} s'ha connectat`.green);

    //Envia la sala els dos jugador perquè carreguin els seus noms
    socket.emit("sala",db.json.sala);
    socket.broadcast.emit("sala",db.json.sala);

    return Promise.resolve();
}

//S'activa cada vegada que un jugador "tira" en la partida
async function tirada(socket,jugador,mapa)
{
    //Agafa base de dades
    await db.agafar();
    //Guarda el $jugador en la base de dades
    db.json.sala["j"+jugador.j] = jugador;
    //Guarda el $mapa (o tauler) en la base de dades
    db.json.tauler = mapa;
    console.table(db.json.tauler);
    //Envia el oponent que ja pot començar la partida
    guanyador = normes.quiHaGuanyat(db.json.tauler);
    if(guanyador != 0){
        socket.emit("guanyador",guanyador);
        socket.broadcast.emit("guanyador",guanyador);
    }else{
        socket.broadcast.emit("partida", mapa);
    }

    //Guarda la base de dades
    await db.guardar();
}


io.on("connection",async (socket)=>{
    socket.on("nom",async (nom)=>{
        //Si hi ha + de 2 jugadors connectats no et deixa entrar
        if(j <= 2){
            //Prepara tot perque entris
            await entrar(socket, nom);
        }
    })

    socket.on("tirada", async (jMesMapa)=>{
        jugador = jMesMapa[0];
        mapa = jMesMapa[1];
        tirada(socket,jugador,mapa);
    })

    socket.on("disconnect",async ()=>{
        await db.reiniciar();
        j = 1;
        console.table(db.json.sala);
        console.log("S'ha desconectat")
    })
})


module.exports = io;
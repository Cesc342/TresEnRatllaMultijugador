//Declara un mapa de 0, 1 i 2 de click per saber on estan els cercles i les creus i
//on no hi han. Serveix perquè la CPU sapiga on esta cada cosa situada en el tauler.
//0 = No hi ha res
//1 = Hi ha una creu
//2 = Hi ha un cercle
mapaClicks = [[0,0,0],[0,0,0],[0,0,0]];

//On es guarda les <img> del HTML
var tauler = [[null,null,null],[null,null,null],[null,null,null]];
agafarTauler();

async function jugar(x)
{
  //La funcio no funcionara quan l'usuari clici en un lloc que hi ha una creu o cercle
  //o quan ja s'ha acabat la partida
  console.table(mapaClicks);
  console.log(taulerAMapaDeClicks(x));
  p = taulerAMapaDeClicks(x);
  if(mapaClicks[p[0]][p[1]] == 0 && jugador.torn){
    //Tria si és j1 o j2 per ficar cercle o creu en el tauler
    if(jugador.j == 1){
      mercarCreu(x);
      mercarCreuEnElMapaDeClicks(x);
    }else if(jugador.j == 2){
      mercarCercle(x);
      mercarCercleEnElMapaDeClicks(x);
    }
    //Acaba torn
    jugador.torn = false;

    //Envia el mapa i el jugador, fent que acabi la partida
    jMesMapa = [jugador, mapaClicks];
    socket.emit("tirada", jMesMapa);
  }else{
    if(!(mapaClicks[p[0]][p[1]] == 0)){
      alert("Error: cela ja ocupada, tria un altre");
    }else if(!jugador.torn){
      alert(`Error: no es el teu torn ${jugador.nom}`);
    }
  }
}

function agafarTauler() 
{
  //Colocar cada imatge de forma ordenada per aconseguir un tauler
  //de escacs per triar de forma més ordenada
  i = 0;
  while (i<tauler.length) {
    tauler[i][0] = document.getElementById("A"+(i+1));
    tauler[i][1] = document.getElementById("B"+(i+1));
    tauler[i][2] = document.getElementById("C"+(i+1));
    i++;
  }
}


function mercar(x)
{
  //Agafa el element que esta sobre el lloc del retoli
  lloc = document.getElementById(x);

  //Marca una mica més el borde ficant-lo més gruixut
  lloc.style.border = "2px solid black";
}

function mercarCreu(x) {
  //Miro si la zona clicada ja estava mercada
  pos = taulerAMapaDeClicks(x);
  if(mapaClicks[pos[0]][pos[1]] == 0){
    //Agafa el element que el usuari a clickat
    lloc = document.getElementById(x);

    //Marco el lloc on s'ha ficat la creu en el mapad de clicks
    mercarCreuEnElMapaDeClicks(x);

    //Fica la imatge de la creu el lloc on s'ha clicat
    lloc.src = "../img/creu.png";
  }
}

function mercarCercle(x) 
{
  //Miro si la zona clicada ja estava mercada
  pos = taulerAMapaDeClicks(x);
  if(mapaClicks[pos[0]][pos[1]] == 0){
    //Agafa el element que el CPU a "clickat"
    lloc = document.getElementById(x);

    //Marco el lloc on s'ha ficat el cercle en el mapad de clicks
    mercarCercleEnElMapaDeClicks(x);

    //Fica la imatge de el cercle el lloc on a "clicat" la cpu
    lloc.src = "../img/cercle.png";
  }
}

function taulerAMapaDeClicks(x) 
{
  //Crea variable posicio i fica ja la segona variable perquè ja
  //és un nombre però es resta un numera per el fet de que en un
  //array la posicio 1 s'agafa amb el 0
  posicio = [0,(x[1]-1)];

  //Declaro primera variable de la posicio convertin les lletres
  //en numeros segons l'abacedari
  if(x[0] == "A"){
    posicio[0] = 0;
  }else if(x[0] == "B"){
    posicio[0] = 1;
  }else{
    posicio[0] = 2;
  }

  return posicio;
}

function mercarCreuEnElMapaDeClicks(x) 
{
  //Canvia les lletres de la posicio en el tauler en numeros perquè
  //pugui així manipular la array
  posicio = taulerAMapaDeClicks(x);

  //Passo les posicions en x i y per entendreu millor
  x = posicio[0];
  y = posicio[1];

  //Marco que hi ha una creu en aquella posicio en l'array
  //La creu es guardara com un 1.
  mapaClicks[x][y] = 1;
}

function mercarCercleEnElMapaDeClicks(x) {
  //Canvia les lletres de la posicio en el tauler en numeros perquè
  //pugui així manipular la array
  posicio = taulerAMapaDeClicks(x);

  //Passo les posicions en x i y per entendreu millor
  x = posicio[0];
  y = posicio[1];

  //Marco que hi ha un cercle en aquella posicio en l'array
  //El cercle es guardara com un 2.
  mapaClicks[x][y] = 2;
}

function mapaDeClicksATauler(x,y) 
{
  //Declaro variable pos per després ficar la posició
  pos = "";

  //Canvia la x a una lletra i la y es concatena sumantli un per
  //la mania de les arrays.
  if(x == 0){
    pos = "A"+(y+1);
  }else if(x == 1){
    pos = "B"+(y+1);
  }else if(x == 2){
    pos = "C"+(y+1);
  }
  return pos;
}

/////////////////////////////////////////// IO ////////////////////////////////////////////////////

//Funciona
async function agafarMapaClicks()
{
    //Demana el tauler al servidor i el guarda directament el mapa de clicks
    JSONmapaClicks = await fetch("/IDE/tauler");
    mapaClicks = await JSONmapaClicks.json();

    TOTmapaDeClicksATauler();
}

//Agafa la informacio del mapa de clicks i fa un output directament a les imatges (al $tauler) del HTML
function TOTmapaDeClicksATauler(){
  for(var i = 0; i < mapaClicks.length; i++){
    for(var o = 0; o < mapaClicks[i].length; o++){
      pos = mapaDeClicksATauler(i,o);

      lloc = document.getElementById(pos);
      //Mira si és creu o cercle, i fica les imatges corresponents
      if(mapaClicks[i][o] == 1){
        lloc.src = "../img/creu.png";
      }else if(mapaClicks[i][o] == 2){
        lloc.src = "../img/cercle.png";
      }
    }
  }
}

function carregarNoms(nom1, nom2){
  j1 = document.getElementById("j1");
  j2 = document.getElementById("j2");

  j1.innerText = nom1;
  j2.innerText = nom2;
}
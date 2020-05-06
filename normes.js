function Normes(){
    this.quiHaGuanyat = function (mapaClicks) 
    {
      //Variable que determinara qui guanyarà amb numeros del mapa de clicks
      quiHaG = 0;
    
      //es crea variable per veure si totes les parceles ja estan ocupades
      num = 0;
      //Es suma 1 cada vegada que troba una parcela que NO esta buida
      i = 0;
      while(i<mapaClicks.length){
        o = 0;
        while(o<mapaClicks[i].length){
          if(mapaClicks[i][o] != 0){
            num++;
          }
          o++;
        }
        i++;
      }
    
      //si num == 9 significara que en totes les parceles hi ha algo i es declarara empat
      if(num == 9){
        quiHaG = 0;
        jugador.torn = false;
      }
    
    
      //Mira si hi ha un tres en retlla en vartical i en horitzontal i de qui ha sigut
      i=0;
      while(i<mapaClicks.length){
        if(mapaClicks[i][0] == 1 && mapaClicks[i][1] == 1 && mapaClicks[i][2] == 1){
          quiHaG = 1;
          jugador.torn = false;
        }else if(mapaClicks[i][0] == 2 && mapaClicks[i][1] == 2 && mapaClicks[i][2] == 2){
          quiHaG = 2;
          jugador.torn = false;
        }
        if(mapaClicks[0][i] == 1 && mapaClicks[1][i] == 1 && mapaClicks[2][i] == 1){
          quiHaG = 1;
          jugador.torn = false;
        }else if(mapaClicks[0][i] == 2 && mapaClicks[1][i] == 2 && mapaClicks[2][i] == 2){
          quiHaG = 2;
          jugador.torn = false;
        }
        i++;
      }
    
      //Mira si s'ha fet tres en ratlla pero de punta a punta *·. o .·*
      if(mapaClicks[0][0] == 1 && mapaClicks[1][1] == 1 && mapaClicks[2][2] == 1){
        quiHaG = 1;
        jugador.torn = false;
      }else if(mapaClicks[0][0] == 2 && mapaClicks[1][1] == 2 && mapaClicks[2][2] == 2){
        quiHaG = 2;
        jugador.torn = false;
      }
      if(mapaClicks[0][2] == 1 && mapaClicks[1][1] == 1 && mapaClicks[2][0] == 1){
        quiHaG = 1;
        jugador.torn = false;
      }else if(mapaClicks[0][2] == 2 && mapaClicks[1][1] == 2 && mapaClicks[2][0] == 2){
        quiHaG = 2;
        jugador.torn = false;
      }
      //Torna qui a guanyat
      return quiHaG;
    }
}


module.exports = new Normes();
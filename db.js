const fs = require("fs");

const DB = function()
{
    //Agafa el $json i la guarda en database
    this.guardar = async ()=>
    {
        data = JSON.stringify(this.json);
        await fs.writeFileSync("./database.json",data);
        return Promise.resolve();
    }

    //Agafa la database i la guarda en $json
    this.agafar = async ()=>
    {
        data = await fs.readFileSync("./database.json").toString();
        this.json = JSON.parse(data);
        return Promise.resolve(this.json);
    }

    //Reinicia database i $json. Ja està...
    this.reiniciar = async ()=>
    {
        plantilla = '{"sala":{"j1":{"nom":"","id":"","j":1,"torn":true,"pos":[0,0]},"j2":{"nom":"","id":"","j":2,"torn":false,"pos":[0,0]}},"tauler":[[0,0,0],[0,0,0],[0,0,0]]}';
        this.json = JSON.parse(plantilla);
        await fs.writeFileSync("./database.json",plantilla);
    }

    this.agafarId = (id)=>
    {
        for(jug in this.json.sala){
            jugador = json.sala[jug];
            if(jugador.id = id){
                return jugador;
            }
        }
    }
}

module.exports = new DB();
db = new require("./db");

async function cargar()
{
    /*await db.agafar();
    console.log(db.json);
    db.json.sala.j1.nom = "cesc342";
    await db.guardar();*/
    await db.reiniciar();
}

cargar();
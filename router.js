const express = require("express");
const router = express.Router();

const path = require("path");
const db = require("./db");

//Es prepara per llegir els json que li enviin, i també prepara el servidor en la carpeta public
router.use(express.json());
router.use(express.static(path.join(__dirname,"public")));

//Sarveix per agafar la taula de forma més calmada pel servidor
router.get("/IDE/tauler",async (req,res)=>{
    await db.agafar();
    res.json(db.json.tauler);
})


module.exports = router;
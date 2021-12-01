const  json  = require("body-parser");
const express = require("express");
const bp = require("body-parser");
const qr = require("qrcode");

const app = express();

app.set("view engine", "ejs");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/scan", (req, res) => {
    const url = req.body.url;
    const nome = req.body.nome;
    const idade = req.body.idade;
    const email = req.body.email;
    const instituicao = req.body.instituicao;

    console.log(req.body);  

    if (nome.length === 0)
        res.send("Dados Invalidos");
    qr.toDataURL(nome, (err, src) => {
        if (err) res.send("Erro!");
        res.render("scan",{corpo: req.body,src});
    });
});

const port = 5000;
app.listen(port, () => console.log("Rodando..."));
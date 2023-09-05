const express = require('express')
const app = express()
const port = 3000

app.listen(port, function(){
    console.log("Servidor no ar - Porta: 3000!")
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'))

app.set('views', __dirname + '/public/views')

app.set('view engine', 'ejs')

pages =__dirname + '/public/views'

// CONEXÃO COM O MYSQL

const mysql = require('mysql');
const Usuario = require('./models/Usuario');
const HighScore = require('./models/HighScore');
const Achievement = require("./models/Achievement.js")
const User_has_achievements = require("./models/User_has_achievements.js")

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "cavaleiro"
})
conexao.connect(function(err) {
    if (err) throw err;
    console.log("Banco de Dados Conectado!");
  });

// CONEXÃO

app.post('/cadastrarUsuario', (req, res) => {
    const user = new Usuario()
    user.nome = req.body.nome
    user.email = req.body.email
    user.senha = req.body.senha
    user.data_nascimento = req.body.dataNascimento

    user.inserir(conexao)
    res.render('confirmaCadastro')
});

app.get('/getChat/:userId', (req, res) => {
    const userId = req.params.userId;

    res.end();
})

app.get('/', function(req, res){
    res.render('home');
});

app.get('/tutoriais', function(req, res){
    res.render('tutoriais');
});

app.get('/cadastro', function(req, res){
    res.render('cadastro');
});

app.get('/entrar', function(req, res){
    res.render('entrar');
});

app.get('/cadastrados', function(req, res){
    const user = new Usuario

    user.listar(conexao, (result) => {
        res.render("cadastrados", {u: result})
    })    
});

app.get('/contato', function(req, res){
    res.render('contato');
});

app.get('/sobre', function(req, res){
    res.render('sobre');
});

app.get('/login_efetuado', function(req, res){
    res.render('login_efetuado');
});

app.get('/minijogos', (req, res) => {
    res.render('minijogos')
})

app.get('/highscore', function (req, res) {
    const hs = new HighScore();

    hs.listar(conexao, (result) => {
        res.render("highscore", {hs: result})
    });
})

app.get('/Achievement', function (req, res){
    const achievement = new Achievement();

    achievement.listar(conexao, (result) => {
        res.render("achievement", {achievement: result})
    });
})
app.get('/User_has_achievements', function (req, res){
    const user_has_achievement = new User_has_achievements();

    user_has_achievement.listar(conexao, (result) => {
        res.render("user_has_achievements", {user_has_achievement: result})
        console.log(user_has_achievement)
    });
})
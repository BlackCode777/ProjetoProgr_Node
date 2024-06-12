/*************************************************/
// Query params = ?nome=NodeJS
// Route Params = /curso/2
// Request Body = { nome: 'Nodejs', tipo: 'Backend' } 

// CRUD > Create, Read, Update, Delete
const express = require("express");
const server = express();
server.use(express.json());

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// Middleware Global
server.use((req, res, next) => {
    console.log(`URL CHAMADA: ${req.url}`);
    return next();
});

function checkCurso(req, res, next) {
    if (!req.body.name) { // se não tiver o nome do curso
        return res.status(400).json({ error: "Nome do curso é obrigatório" }); // retorna um erro
    }
    return next();
}

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index]; // pega o curso pelo index

    if (!curso) { // se não tiver o curso
        return res.status(400).json({ error: "O curso não existe" }); // retorna um erro
    }

    req.curso = curso; // adiciona o curso na requisição
    return next();
}

// Listar todos os cursos
server.get("/cursos", (req, res) => {
    return res.json( cursos ); // localhost:3000/cursos
});

// Busca um curso por index no array
server.get("/cursos/:index", checkIndexCurso, (req, res) => { // localhost:3000/cursos/1
    return res.json( req.curso );
});

// Criar um novo curso
server.post("/cursos", checkCurso, (req, res) => { // localhost:3000/cursos
    const { name } = req.body;
    cursos.push(name);
    return res.json( cursos );
});

// Atualizar um curso
server.put("/cursos/:index", checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    cursos[index] = name;
    return res.json( cursos );
});

// Deletar um curso
server.delete("/cursos/:index", checkIndexCurso, (req, res) => {
    const { index } = req.params; 
    cursos.splice(index, 1); // remove 1 item a partir do index
    return res.json( cursos ); // localhost:3000/cursos/1
});

server.listen(3000);

/*************************************************/

// Instalando nodemon
// yarn add nodemon -D 
    // -D = dependência de desenvolvimento
    // -D = npm install nodemon -D
    // nodemon index.js
    // yarn index.js
    // nodemon serve para reiniciar o servidor automaticamente toda vez que houver uma alteração no código

// yarn add express -D

/*************************************************/
// const express = require("express");
// const server = express();

// const cursos = ['Node JS', 'JavaScript', 'React Native'];

// server.get("/curso/:index", (req, res) => {
//     const { index } = req.params;
//     return res.json( cursos[index] );
// });
// server.listen(3000);

// localhost:3000/curso
// server.get("/curso/:id", (req, res) => {
//     const id = req.params.id;
//     return res.json({ curso: `Node JS ${id}` });
//     // return res.send("Hello World!");
// });
// server.listen(3000);


/*************************************************/
// Iniciando o servidor com Express
// const express = require("express");
// const server = express();
// // localhost:3000/curso
// server.get("/curso", (req, res) => {
//     console.log("Acessou a rota!");
//     return res.json({ curso: "Node JS" });
//     // return res.send("Hello World!");
// });
// server.listen(3000);

/*************************************************/
// Estudo - Query Params / Route Params / Request Body

// Request Body = { "name": "Diego", idade: 35, estadoCivil: "Casado" } - são os parametros que são passados no corpo da requisição
// const express = require("express");
// const server = express();
// server.use(express.json());

// // Usando método POST com body contendo estes dados -> Body = { "name": "Diego" }
// server.post("/curso", (req, res) => {
//     const { name } = req.body;
//     return res.json({ curso: `Curso: ${name}` }); // localhost:3000/curso
// });
// server.listen(3000);

/*************************************************/
// Route Params = /users/1 - são os parametros que são passados na rota
// const express = require("express");
// const server = express();
// // localhost:3000/curso
// server.get("/curso/:id", (req, res) => {
//     const id = req.params.id;
//     return res.json({ curso: `Params: ${id}` }); // localhost:3000/curso/1
// });
// server.listen(3000);

/*************************************************/
// Query Params = ?teste=1 - são os parametros que são passados na URL
// const express = require("express");
// const server = express();
// // localhost:3000/curso
// server.get("/curso", (req, res) => {
//     const nome = req.query.nome;
//     return res.json({ curso: `Aprendendo: ${nome}` }); // localhost:3000/curso?nome=NodeJS
// });
// server.listen(3000);

/*************************************************/

//console.log("Hello World!", express);

/*
req -> representa a requisição que o cliente fez ao servidor 
res -> representa a resposta que será enviada ao cliente para o frontend
*/
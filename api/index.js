const express = require('express')
const cors = require('cors');
const { Client } = require('pg');
const { query } = require('express');

const port = 61644;

const app = express();
app.use(cors());
app.use(express.json());

app.post("/users", (req, res) => {
    const userData = req.body;
    saveUserInDataBase(
      userData.name,
      userData.surname,
      userData.age,
      userData.password
    );
    res.send('Esto es el método post');
});

//APP PARA OBTENER USUARIOS DE LA BASE DE DATOS
app.get("/users", async(req, respuesta) => {
  const users = await getUserInDataBase();
  respuesta.send(users);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function saveUserInDataBase(name, surname, age, password) {
  //Guarda en la BASE DE DATOS LOS DATOS
    const client = new Client({
      user: 'cogvzfetknpzap',
      host: 'ec2-54-167-186-198.compute-1.amazonaws.com',
      database: 'd88blqnai3na78',
      password: '401b190dca0792b12fc935b7dcd37e17e7b7877c8d975f4dc3fc2d92d04d37bd',
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      }
    });
    await client.connect();

    const queryToInsert = "INSERT INTO users VALUES ('" + 
    name + 
    "','" + 
    surname + 
    "','" +
    age +
    "','" +
    password +
    "')";
    console.log("Estamos mandando: " + queryToInsert);
    const res = await client.query(queryToInsert);
    console.log("AQUÍ: " + res.rows);
    await client.end();
}

//OBTENER CLIENTES DE LA BASE DE DATOS
async function getUserInDataBase() {
  const getClient = new Client({
    //DATOS DE LA BASE DE DATOS
    //https://data.heroku.com/datastores/1ac7b247-0a04-40ad-b649-0073e4537290#administration
      user: 'cogvzfetknpzap',
      host: 'ec2-54-167-186-198.compute-1.amazonaws.com',
      database: 'd88blqnai3na78',
      password: '401b190dca0792b12fc935b7dcd37e17e7b7877c8d975f4dc3fc2d92d04d37bd',
      port: 5432,
      ssl: {
        rejectUnauthorized: false,
      },
  });

  await getClient.connect();

  const respuesta = await getClient.query("SELECT * FROM users");
  console.log(respuesta.rows);
  await getClient.end();
  return respuesta.rows;
}
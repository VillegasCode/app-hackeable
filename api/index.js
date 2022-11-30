const express = require('express')
const cors = require('cors');
const { Client } = require('pg');
const { query } = require('express');

const port = 61644;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function saveUserInDataBase(name, surname, age, password) {
  //Guarda en la BASE DE DATOS LOS DATOS
    const client = new Client({
      user: 'tnqrxlujsfqkfk',
      host: 'ec2-3-209-39-2.compute-1.amazonaws.com',
      database: 'dageouub3lbo9n',
      password: '282a272704555dfe55c7cfafb9b6537a61e43d016652bb996c9574e22c80a612',
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
    console.log(res.rows); // Hello world!
    await client.end();
}
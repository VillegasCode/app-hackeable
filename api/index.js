const express = require('express')
const cors = require('cors');

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
      userData.surName,
      userData.age,
      userData.password
    );
    res.send('Esto es el método post');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

function saveUserInDataBase(name, surName, age, password) {
  //Guarda en la BASE DE DATOS LOS DATOS
  debugger;
}
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
    console.log(req.body);
    res.send('Esto es el método post');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
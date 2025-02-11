  const express = require('express');
const bodyParser = require('body-parser');
const usuarioRoutes = require('./routes/usuarioRoutes'); 

const app = express();

app.use(bodyParser.json());

app.use('/usuarios', usuarioRoutes);

const port = 9000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

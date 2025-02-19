const express = require('express'); 
const cors = require('cors');
 
const router = require('./routes/routes');

const app = express();
app.use(cors())
app.use(express.json());

app.listen(8081,() => {
    console.log("Rodando");
})

app.get('/test', (req, res) => {
    res.send("Servidor rodando! 🚀");
});

app.use(router);

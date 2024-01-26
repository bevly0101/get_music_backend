const express = require('express');
const App = express();
const PORT = 4444
const Routes = require('./src/routes')

App.use(Routes);
App.use('mp3', express.static(__dirname + '/mp3'));

App.listen(PORT,()=>{
    console.log(`server rodando na porta ${PORT}`)
})
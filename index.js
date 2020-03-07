//importa express
var express = require('express');
//inporta socket.io
var socket = require ("socket.io");

//comienza tu instancia de express
var app = express();
//comienza el servidor en el port
var server = app.listen(3000, () =>{
    console.log("listening on port 3000");
});
//archivos estaticos
app.use(express.static('public'));

//quier que socket.io trabaje con el servidor
var io = socket(server);
//io espara que comienze una conneccion para ejecutar una funcion callback => recuerda que tienes que agregar el socket io en el html
io.on('connection', (socket) =>{
    console.log("hay una connecion socket", socket.id);
    //aqui podemos escuchar por eventos del cliente y reciviendo la informacion ejecutart funciones 
    socket.on('chat', (data) => {
        //sockets(plural) significat todos los clientes con un socket al servidor
        io.sockets.emit('chat', data);
    })
})
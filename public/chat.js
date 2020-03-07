// Hacemos una conneccion => y podemos ver en el servidor la connecion abierta
var socket = io.connect('http://localhost:3000');

// Query para el DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle'),
    btn = document.getElementById('send'),
    output = document.getElementById('output');

//configura lo que deve de pasar para differentes eventos   
btn.addEventListener('click', () => {
    console.log("fire")
    //usamos la funcion emmit que toma el destino y la infomacion para mandar al servidor
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
});

//escuchemos por los eventos del servidor
socket.on('chat', (data) => {
    output.innerHTML += '<p><strong>'+ data.handle + ': </strong>' + data.message + '</p>';
});
// Hacemos una conneccion => y podemos ver en el servidor la connecion abierta
var socket = io.connect("http://localhost:3000");

// Query para el DOM
var message = document.getElementById("message");
(handle = document.getElementById("handle")),
  (btn = document.getElementById("send")),
  (output = document.getElementById("output")),
  (feedback = document.getElementById("feedback"));

//configura lo que deve de pasar para differentes eventos
btn.addEventListener("click", () => {
  //usamos la funcion emit que toma el destino y la infomacion para mandar al servidor
  socket.emit("chat", {
    message: message.value,
    handle: handle.value
  });
  //reset al usuario que esta escribiendo
  message.value = "";
});

message.addEventListener("keypress", () => {
  socket.emit("typing", handle.value);
});

//escuchemos por los eventos del servidor
socket.on("chat", function(data) {
  feedback.innerHTML = "";
  output.innerHTML +=
    "<p><strong>" + data.handle + ": </strong>" + data.message + "</p>";
  //en cada mensaje nuevo navegamos al final del div
  document.getElementById("chat-window").scrollTop = 9999999;
});

socket.on("typing", function(data) {
  feedback.innerHTML = "<p><em>" + data + " is typing a message...</em></p>";
  document.getElementById("chat-window").scrollTop = 9999999;
});

var input = document.getElementById("message");

input.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    console.log("fire it ");
    document.getElementById("send").click();
  }
});
// var msgDiv = document.getElementByClass("chat-window");
// msgDiv.scrollBottom = msgDiv.scrollHeight;

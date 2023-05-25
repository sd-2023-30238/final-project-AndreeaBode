// Definirea endpoint-ului WebSocket
const websocketEndpoint = 'ws://localhost:8080/adminboard';

// Crearea conexiunii WebSocket
const socket = new WebSocket(websocketEndpoint);

// Manipularea evenimentului de conectare la WebSocket
socket.onopen = function(event) {
  console.log('Conexiune WebSocket stabilită');
};

// Manipularea evenimentului de primire a mesajelor WebSocket
socket.onmessage = function(event) {
  // Manipulați notificările primite de la server
  const notification = JSON.parse(event.data);
  // Afișați notificarea pe pagina adminboard
  document.getElementById('notificationContainer').innerHTML = notification.message;
};

// Manipularea evenimentului de închidere a conexiunii WebSocket
socket.onclose = function(event) {
  console.log('Conexiune WebSocket închisă');
};

// Manipularea evenimentului de eroare a conexiunii WebSocket
socket.onerror = function(error) {
  console.error('Eroare WebSocket:', error);
};

// Restul codului și logica aplicației
// ...

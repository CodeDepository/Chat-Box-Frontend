let username = '';
const socket = io('https://chat-box-backend-ipno.onrender.com');
window.onload = () => {
  
  const input = document.getElementById('input');
  const button = document.querySelector('button');

  const sendMessage = () => {
    const msg = input.value.trim();
    if (msg !== '') {
      socket.emit('message', msg);
      input.value = '';
      input.focus();
    }
  };

  button.onclick = sendMessage;

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendMessage();
  });

  socket.on('message', (msg) => {
    const item = document.createElement('li');
    item.innerHTML = msg;
    document.getElementById('messages').appendChild(item);
    item.scrollIntoView();
  });

  const username = prompt('Enter your name:') || 'Anonymous';
  socket.emit('setName', username);
};

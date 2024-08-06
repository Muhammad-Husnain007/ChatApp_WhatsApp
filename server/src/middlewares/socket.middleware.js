// const SocketSetup = (io) => {
//     io.on('connection', (socket) => {
//         console.log('New client connected', socket.id);
  
//         socket.on('disconnect', () => {
//             console.log('Client disconnected');
//         });
  
//         socket.on('sendMessage', (message) => {
//             io.emit('messageReceived', message); // Broadcast the message to all connected clients
//         });
  
//         socket.on('updateMessage', (updatedMessage) => {
//             io.emit('messageUpdated', updatedMessage); // Broadcast the updated message
//         });
  
//         socket.on('deleteMessage', (messageId) => {
//             io.emit('messageDeleted', messageId); // Broadcast the deleted message ID
//         });
//     });
//   };
  
//   export default SocketSetup;
  
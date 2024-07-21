const SocketSetup = (io) => {
    io.on('connection', (socket) => {
        console.log('A user connected', socket.id);

        socket.on('disconnect', () => {
            console.log('User disconnected', socket.id);
        });

        // Add more event listeners as needed
        socket.on('sendMessage', (message) => {
            io.emit('receiveMessage', message);
        });
    });
};

export default SocketSetup;

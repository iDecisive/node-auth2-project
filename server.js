const express = require('express');
const usersRouter = require('./routers/usersRouter.js');

const server = express();

const PORT = 8000;

//Middleware

server.use(express.json());

server.use('/api/',usersRouter);

server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
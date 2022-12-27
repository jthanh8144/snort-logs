require('dotenv').config();
const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const { connectDB } = require('./config/db');
const { route } = require('./routers/index');

const app = express();
const port = process.env.APP_PORT || 3000;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
global.io = new Server(server);
global.socketActive = true;

const init = async () => {
  await connectDB();
  app.use(express.static(path.join(__dirname, '..', 'public')));
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());
  app.engine(
    'hbs',
    handlebars({
      extname: '.hbs',
      helpers: require('./helpers/handlebars'),
    })
  );
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'views'));

  route(app);

  io.on('connection', (socket) => {
    global.socketActive = true;
    console.log('connected');

    socket.on('disconnect', () => {
      global.socketActive = false;
      console.log('disconnected');
    });
  });

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

init();

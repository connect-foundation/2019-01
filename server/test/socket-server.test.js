/* eslint-disable */
const ioClient = require('socket.io-client');
const http = require('http');
const { app, socketIo } = require('../bin/app').default;

let socket;
let httpServer;
let httpServerAddr;

// 테스트를 시작하기 전 
beforeAll((done) => {
  httpServer = http.createServer(app).listen('5001');
  socketIo.attach(httpServer);
  httpServerAddr = httpServer.address();

  socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    done();
  });
});

// 모든 test가 끝난 후 
afterAll((done) => {
  socketIo.close();
  httpServer.close();
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});


describe('socket.io test', () => {
  test(`'enter_room' event test`, (done) => {
    socket.once('enter_room', (message) => {
      // console.log(message);
      expect(['characterList', 'isGameStarted', 'isOwner', 'timeLimit']).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    socket.emit('enter_room');
  });

  test(`'move' event test`, (done) => {
    socket.once('move', (message) => {
      console.log(message);
      expect(["userId", "indexX", "indexY"]).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    socket.emit('move','left');
  });
});


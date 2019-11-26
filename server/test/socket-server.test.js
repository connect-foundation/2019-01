
const ioClient = require('socket.io-client');
const http = require('http');
const { app, socketIo } = require('../bin/app').default;

let socket;
let httpServer;
let httpServerAddr;

describe('socket.io test', () => {
  // 테스트를 시작하기 전
  beforeAll(() => {
    httpServer = http.createServer(app).listen('5001');
    socketIo.attach(httpServer);
    httpServerAddr = httpServer.address();

    socket = ioClient.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
    });
  });

  // 모든 test가 끝난 후
  afterAll(() => {
    if (socket.connected) {
      socket.disconnect();
    }

    socketIo.close();
    httpServer.close();
  });

  test('connect test', (done) => {
    socket.on('connect', () => {
      expect(true);
      done();
    });
  });

  test('emit test', (done) => {
    socket.once('enter_room', (message) => {
      expect(message).toBeTruthy();
      done();
    });
    socket.emit('enter_room');
  });

  test('[EMIT] \'enter_room\' event test', (done) => {
    socket.once('enter_room', (message) => {
      console.log(message);
      expect(['characterList', 'isGameStarted', 'isOwner', 'timeLimit']).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    socket.emit('enter_room');
  });

  test('\'move\' event test', (done) => {
    socket.once('move', (message) => {
      console.log(message);
      if (!message) { done(); return; }

      expect(['userId', 'indexX', 'indexY']).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    socket.emit('move', 'left');
  });
});

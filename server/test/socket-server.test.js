import mock from './mock';

const { ENTER_RESPONSE_KEYS, MOVE_RESPONSE_KEYS } = mock;

const ioClient = require('socket.io-client');
const http = require('http');
const { app, socketIo } = require('../bin/app').default;

let socket;
let httpServer;
let httpServerAddr;

describe('socket.io test', () => {
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

  afterAll(() => {
    if (socket.connected) {
      socket.disconnect();
    }
    socketIo.close();
    httpServer.close();
  });

  test('connect test', (done) => {
    socket.on('connect', () => {
      done();
    });
  });

  test('[EMIT] \'enter_room\' event test', (done) => {
    socket.once('enter_room', (message) => {
      expect(ENTER_RESPONSE_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    socket.emit('enter_room', 1);
  });

  test('\'move\' event test', (done) => {
    socket.once('move', (message) => {
      if (!message.canMove) done();

      expect(MOVE_RESPONSE_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    socket.emit('move', 0);
  });

  test('[EMIT] \'leave_room\' event test', (done) => {
    socket.once('leave_room', () => done());
    socket.emit('leave_room', 1);
  });
});

import mock from './mock';

const {
  ENTER_RESPONSE_KEYS, MOVE_RESPONSE_KEYS, ROOM_INFO_KEYS, KNOCK_ROOM_KEYS,
} = mock;

const ioClient = require('socket.io-client');
const http = require('http');
const { app, socketIo } = require('../bin/app').default;

let clientSocket1;
let clientSocket2;
let httpServer;
let httpServerAddr;

beforeAll(() => {
  httpServer = http.createServer(app).listen('5001');
  socketIo.attach(httpServer);
  httpServerAddr = httpServer.address();

  const connectUrl = `http://[${httpServerAddr.address}]:${httpServerAddr.port}`;
  const connectOption = {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
  };

  clientSocket1 = ioClient.connect(connectUrl, connectOption);
  clientSocket2 = ioClient.connect(connectUrl, connectOption);
});

afterAll(() => {
  if (clientSocket1.connected) {
    clientSocket1.disconnect();
  }

  if (clientSocket2.connected) {
    clientSocket2.disconnect();
  }

  socketIo.close();
  httpServer.close();
});

describe('socket.io connect test', () => {
  test('client1 connect test', (done) => {
    clientSocket1.on('connect', () => done());
  });

  test('client2 connect test', (done) => {
    clientSocket2.on('connect', () => done());
  });
});

describe('lobby event test', () => {
  let roomId;

  test('[EMIT] client1 \'enter_lobby\' event test', (done) => {
    clientSocket1.once('enter_lobby', (message) => {
      expect(message).toEqual([]);
      done();
    });
    clientSocket1.emit('enter_lobby');
  });

  test('[EMIT] client1 \'create_room\' event test', (done) => {
    clientSocket1.once('create_room', (message) => {
      roomId = message;
      expect(typeof message).toEqual('string');
      done();
    });
    clientSocket1.emit('create_room', 'room name');
  });

  test('[EMIT] client2 \'enter_lobby\' event test2', (done) => {
    clientSocket2.once('enter_lobby', (message) => {
      expect(ROOM_INFO_KEYS).toEqual(expect.arrayContaining(Object.keys(message[0])));
      done();
    });
    clientSocket2.emit('enter_lobby');
  });

  test('[EMIT] client2 \'knock_room\' event test2', (done) => {
    clientSocket2.once('knock_room', (message) => {
      expect(KNOCK_ROOM_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      expect(message[KNOCK_ROOM_KEYS[0]]).toBeTruthy();
      done();
    });
    clientSocket2.emit('knock_room', roomId);
  });
});

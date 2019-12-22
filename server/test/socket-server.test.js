import mock from './mock';
import Client from './client';

const {
  ENTER_RESPONSE_KEYS, MOVE_RESPONSE_KEYS, ROOM_INFO_KEYS,
  KNOCK_ROOM_KEYS, START_ROUND_KEYS,
} = mock;

const ioClient = require('socket.io-client');
const http = require('http');
const { app, socketIo } = require('../bin/app').default;

let httpServer;
let httpServerAddr;

const roomName = 'test room name';
const ownerClient = new Client();
const playerClient = new Client();

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

  const ownerSocket = ioClient.connect(connectUrl, connectOption);
  const playerSocket = ioClient.connect(connectUrl, connectOption);

  ownerClient.setSocket(ownerSocket);
  playerClient.setSocket(playerSocket);
});

afterAll(() => {
  if (ownerClient.isConnected()) {
    ownerClient.disconnect();
  }

  if (playerClient.isConnected()) {
    playerClient.disconnect();
  }

  socketIo.close();
  httpServer.close();
});

describe('socket.io connect test', () => {
  test('owner client connect test', (done) => {
    ownerClient.once('connect', () => done());
  });

  test('player client connect test', (done) => {
    playerClient.once('connect', () => done());
  });
});

describe('lobby event test', () => {
  test('[EMIT] owner client \'enter_lobby\' event test', (done) => {
    ownerClient.once('enter_lobby', (message) => {
      expect(message).toEqual([]);
      done();
    });
    ownerClient.emit('enter_lobby');
  });

  test('[EMIT] owner client \'create_room\' event test', (done) => {
    ownerClient.once('create_room', (message) => {
      expect(typeof message).toEqual('string');
      ownerClient.setRoomId(message);
      done();
    });
    ownerClient.emit('create_room', roomName);
  });

  test('[EMIT] player client \'enter_lobby\' event test2', (done) => {
    playerClient.once('enter_lobby', (message) => {
      expect(ROOM_INFO_KEYS).toEqual(expect.arrayContaining(Object.keys(message[0])));
      done();
    });
    playerClient.emit('enter_lobby');
  });

  test('[EMIT] player client \'knock_room\' event test2', (done) => {
    playerClient.once('knock_room', (message) => {
      expect(KNOCK_ROOM_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      expect(message[KNOCK_ROOM_KEYS[0]]).toBeTruthy();
      done();
    });
    const roomId = ownerClient.getRoomId();
    playerClient.emit('knock_room', roomId);
  });
});

describe('room event test', () => {
  test('[EMIT] owner client \'enter_room\' event test2', (done) => {
    ownerClient.once('enter_room', (message) => {
      expect(ENTER_RESPONSE_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      expect(message.isOwner).toBeTruthy();
      expect(message.roomName).toBe(roomName);
      done();
    });
    const roomId = ownerClient.getRoomId();
    ownerClient.emit('enter_room', roomId);
  });

  test('[EMIT] player client \'enter_room\' event test2', (done) => {
    const roomId = ownerClient.getRoomId();
    playerClient.once('enter_room', (message) => {
      expect(ENTER_RESPONSE_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      expect(message.isOwner).toBeFalsy();
      expect(message.roomName).toBe(roomName);
      playerClient.setRoomId(roomId);
      done();
    });
    playerClient.emit('enter_room', roomId);
  });
});

describe('move event test', () => {
  test('[EMIT] owner client \'move\' event test', (done) => {
    ownerClient.once('move', (message) => {
      expect(MOVE_RESPONSE_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
    ownerClient.emit('move', 0);
  });
});

describe('game event test', () => {
  test('[EMIT] owner client \'start game\' event test', (done) => {
    ownerClient.once('start_game', () => done());
    ownerClient.emit('start_game');
  });

  test('[EMIT] player client \'start game\' event test', (done) => {
    playerClient.once('start_game', () => done());
  });

  test('[EMIT] owner client \'start round\' event test', (done) => {
    ownerClient.once('start_round', (message) => {
      expect(START_ROUND_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
  });

  test('[EMIT] player client \'start round\' event test', (done) => {
    playerClient.once('start_round', (message) => {
      expect(START_ROUND_KEYS).toEqual(expect.arrayContaining(Object.keys(message)));
      done();
    });
  });
});

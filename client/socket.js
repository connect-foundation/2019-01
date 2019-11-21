/* eslint-disable no-underscore-dangle */
import socketio from 'socket.io-client';
import EVENT from '../constants/socket-event';

class SocketContainer {
  constructor() {
    this.socket = undefined;
    this.connect(); //this.socket = socketio.connect('http://localhost:3000');이 들어가는 것보다 이렇게 함수를 호출하는 것이 좋을까요?
  }

  connect() {
    this.socket = socketio.connect('http://localhost:3000');
  }

  disconnect() {
    this.socket.disconnect();
  }

  onEnterRoom(callback) {   // on을 해주는 부분을 socket파일에 넣고 싶어서 callback을 받아서 실행하는데 이 구조는 괜찮나요?
    this.socket.on(EVENT.ENTER_ROOM, (data) => callback(data));
  }

  onEnterPlayer(callback) {
    this.socket.on(EVENT.ENTER_PLAYER, (data) => callback(data));
  }

  emitStartGame() {
    this.socket.emit('start_game');   // 보통 socket event name은 '_'를 많이 쓰는지 궁금합니다! 
  }

  onQuizList(callback) {
    this.socket.on('get_quiz_list', (data) => callback(data));
  }
}

const socket = new SocketContainer();

export default socket;

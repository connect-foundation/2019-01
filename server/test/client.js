class Client {
  constructor() {
    this.indexX = null;
    this.indexY = null;
    this.roomId = '';
    this.socket = null;
  }

  getIndexes() {
    return [this.indexX, this.indexY];
  }

  setIndexes([indexX, indexY]) {
    this.indexX = indexX;
    this.indexY = indexY;
  }

  getRoomId() {
    return this.roomId;
  }

  setRoomId(roomId) {
    this.roomId = roomId;
  }

  setSocket(socket) {
    this.socket = socket;
  }

  once(event, callback) {
    this.socket.once(event, callback);
  }

  emit(event, data) {
    this.socket.emit(event, data);
  }

  isConnected() {
    return this.socket.connected;
  }

  disconnect() {
    this.socket.disconnect();
  }
}

export default Client;

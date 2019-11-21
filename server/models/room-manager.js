import Room from './room';

class RoomManager {
  constructor() {
    this.rooms = new Map();
    this.players = new Map();
  }

  enter(player) {
    this.players.set(player.socketId, player);
  }

  getRoomInfos() {
    return this.rooms.values();
  }

  createRoom(roomName, player) {
    const roomId = 0; // uuid로 변경 필
    return this.rooms.set(roomId, new Room(roomName, roomId, player));
  }

  async enterRoom(roomId, socketId) {
    const room = this.rooms.get(roomId);
    const player = this.players.get(socketId);
    const character = await room.enterNewPlayer(player);
    this.players.delete(socketId);
    return character;
  }

  getExistCharacters(roomId) {
    const room = this.rooms.get(roomId);
    return room.getExistCharacters();
  }
}

export default RoomManager;

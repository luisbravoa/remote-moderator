var db = require("../db");

module.exports = class Session {
  static create(ownerId) {
    const id = this.randomString(10);
    const session = {
      id,
      ownerId
    };
    console.log(session);
    db.saveKey(id, session);

    return session;
  }

  static randomString(length) {
    let result = "";
    const chars =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";
    for (var i = length; i > 0; --i)
      result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  constructor(id) {
    const sessionInfo = db.readKey(id);

    if (!sessionInfo) {
      throw Error("Session not found");
    }
    console.log('sessionInfo', sessionInfo);
    this.moderatorId = sessionInfo.ownerId;
    this.participants = [];
    this.online = [];
  }

  addParticipantToRecords(participant) {
    const foundParticipant = this.participants.find(p => p.id === participant.id);

    if(!foundParticipant){
      this.participants.push(participant);
    } else {
      foundParticipant.socket = participant.socket;
    }

    if(!this.online.includes(participant.id)) {
      this.online.push(participant.id);
    }
    
  }

  removeParticipant({ id }) {
    this.online = this.online.filter(participantId => participantId !== id);
  }

  add(id, name, socket) {
    console.log('add');
    const newParticipant = {
      id,
      name,
      socket
    };
    this.sendJoinedEvent(newParticipant);

    this.addParticipantToRecords(newParticipant);
    
    console.log('add', this.serializeParticipants());
    socket.on("disconnect", () => {

      this.removeParticipant(newParticipant);
      this.sendLeftEvent(newParticipant);
      this.sendParticipants();
      console.log('disconnect', this.serializeParticipants());
    });

    this.sendJoinedEvent(newParticipant);
    this.sendParticipants();
  }

  send(sockets, type, data){
    sockets.forEach((socket) => {
      socket.emit("message", {
        type,
        data
      });
    })
  }

  sendParticipants(){
    this.broadcast('participants', this.serializeParticipants());
  }

  serializeParticipants() {
    return this.participants.map(({id, name}) => {
      return {
        id,
        name,
        isModerator: this.moderatorId === id,
        online: this.online.includes(id)
      }
    })
  }

  sendJoinedEvent({id, name}) {
    this.broadcast('joined', {
      id,
      name,
      isModerator: this.moderatorId === id
    });
  }

  sendLeftEvent({ name, id }) {
    this.broadcast("left", {
      name,
      id
    });
  }

  broadcast(eventName, data) {
    this.send(this.participants.map(p => p.socket), eventName, data);
  }
};

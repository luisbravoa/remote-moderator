module.exports = class Session {
  

  constructor(moderatorId) {
    this.moderatorId = moderatorId;
    this.participants = [];
  }

  add(id, name, socket) {
    const newParticipant = {
      id,
      name,
      socket
    };
    this.sendJoinedEvent(newParticipant);
    this.participants.push(newParticipant);
    socket.on("disconnect", () => {
      this.participants.filter(participant => participant.id !== id);
      this.sendLeftEvent(newParticipant);
    });
  }

  sendJoinedEvent({ name, id }) {
    this.broadcast("joined", {
      name,
      id
    });
  }

  sendLeftEvent({ name, id }) {
    this.broadcast("left", {
      name,
      id
    });
  }

  broadcast(eventName, data) {
    this.participants.forEach(participant =>
      participant.socket.emit(eventName, data)
    );
  }

  static create() {}
}

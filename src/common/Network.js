import axios from 'axios';
import { API } from './config';
import Socket from 'socket.io-client';

export default class Network {
  
  static async createSession(ownerId) {
    return axios.post(API.baseUrl + '/create', {
      ownerId
    });
  }

  static connect({id, userId, username}, {onError, onDisconnect, onMessage}) {
    const socket = Socket(`${API.baseUrl}/?id=${id}&userId=${userId}&username=${username}`);
  
    socket.on('connect', () => {
      console.log('connected');
    });

    socket.on('message', (message) => {
      if(message.type === 'error') {
        onError(message);
        socket.disconnect();
        socket.close();
      } else {
        onMessage(message);
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      socket.close();
      onDisconnect();
    });

  }

}
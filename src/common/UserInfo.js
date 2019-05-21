import uuidv1 from 'uuid/v1';

export default class UserInfo {
 
  static setUserId() {
    if(!localStorage.userId){
      localStorage.userId = uuidv1();
    }
  }
  
  static getUserId() {
    return localStorage.userId;
  }

  static setUserName(username) {
    localStorage.username = username;
  }

  static getUserName() {
    return localStorage.username;
  }

}
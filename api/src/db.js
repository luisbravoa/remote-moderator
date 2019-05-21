const { readFileSync, existsSync, writeFileSync } = require('fs');
const { resolve } = require('path');


const filePath = resolve('./data.json');

class db {

  constructor() {
    this.data = this.read();
  }

  readKey(key) {
    return this.data[key];
  }

  saveKey(key, value) {
    this.data[key] = value;
    this.save();
  }

  save(){
    writeFileSync(filePath, JSON.stringify(this.data, null, 2));
  }

  read() {
    if(!existsSync(filePath)){
      this.save({});
    }
    
    try {
      return JSON.parse(readFileSync(filePath).toString('utf8'));
    } catch(e) {
      return {};
    }
    
  }

}

module.exports = new db();
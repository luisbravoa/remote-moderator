const { readFileSync, existsSync, writeFileSync } = require('fs');
const { resolve } = require('path');


const filePath = resolve('./data.json');

module.exports = class db {
  static save (data){
    writeFileSync(filePath, JSON.stringify(data, null, 2));
  }

  static read() {
    if(!existsSync(filePath)){
      this.save({});
    }
    
    return JSON.parse(readFileSync(filePath).toString('utf8'));
  }

}
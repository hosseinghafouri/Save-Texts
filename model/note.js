const fs = require('fs');

const notemodel = {
    get: {
        all: ()=>{
            let data = fs.readFileSync('./model/note.json', "utf-8")
            return data
        }
    }
}

module.exports = notemodel
const data = require('./note.json')
const fs = require('fs');

const notemodel = {
    get: {
        all: ()=>{
            return JSON.stringify(data)
        }
    },

    put: {
        add: (note)=>{
            data.texts.push(note)
            fs.writeFileSync('./model/note.json', JSON.stringify(data))
        }
    }
}

module.exports = notemodel
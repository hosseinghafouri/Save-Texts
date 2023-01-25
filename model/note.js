const data = require('./note.json')
const fs = require('fs');

const notemodel = {
    get: {
        all: () => {
            return JSON.stringify(data)
        }
    },

    put: {
        add: (note) => {
            data.texts.push(note)
            fs.writeFileSync('./model/note.json', JSON.stringify(data))
        }
    },

    modify: {
        delete: (note) => {

            let index = data.texts.findIndex(elem => elem === note);

            if (index === -1) {
                console.log(index);
                return false
            } else {

                data.texts.splice(index, 1)
                fs.writeFileSync('./model/note.json', JSON.stringify(data))
                return true
            }

        }
    }
}

module.exports = notemodel
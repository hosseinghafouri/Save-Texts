const note = require('./controller/note');


const web = {
    get: [
        ['/', note.index],
        ['/create/?', ]
    ],
}

const api = {

}

module.exports.web = web
module.exports.api = api
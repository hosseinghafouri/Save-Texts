const note = require('./controller/note');


const web = {
    get: [
        ['/', note.index],
    ],
}

const api = {
    get: [
        ['/api/list', note.list],
        ['/api/create', note.create]
    ]
}

module.exports.web = web
module.exports.api = api
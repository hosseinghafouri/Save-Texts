const note = require('./controller/note');


const web = {
    get: [
        ['/', note.index],
    ],
}

const api = {
    get: [
        ['/api/list', note.list],
        ['/api/create', note.create],
        ['/api/delete', note.destroy]
    ]
}

module.exports.web = web
module.exports.api = api
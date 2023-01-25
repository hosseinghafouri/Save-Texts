const fs = require('fs')
const url = require('url');
const notemodel = require('../model/note');

const note = {
    index: () => {
        return fs.readFileSync('./public/index.html')
    },

    create: (req) => {
        if (req.method == 'POST') {
            var body = ''
            req.on('data', function (data) {
                body += data
            })
            req.on('end', function () {
                let data = JSON.parse(body)
                notemodel.put.add(data.text)
            })
            return '201'

        } else {
            return 'post request exceptable.';

        }
    },

    list: () => {
        return notemodel.get.all()
    },

    destroy: (req)=>{
        let request = url.parse(req.url, true).query

        let result = notemodel.modify.delete(request.t)
        if (!result) {
            return `{"status":"sorry we couldnt find this text"}`
        }
        return notemodel.get.all()

    }
}

module.exports = note
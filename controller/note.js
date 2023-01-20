const fs = require('fs')
const notemodel = require('../model/note');

const note = {
    index: ()=>{
        return fs.readFileSync('./public/index.html')
    },

    create: (req)=>{
        
    },

    list: ()=>{
        return notemodel.get.all()
    }
}

module.exports = note
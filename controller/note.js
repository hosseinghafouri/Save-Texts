const fs = require('fs')

const note = {
    index: ()=>{
        return fs.readFileSync('./public/index.html')
    },

    create: ()=>{
        
    }
}

module.exports = note
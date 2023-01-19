const http = require('http'),
    fs = require('fs'),
    router = require('./router'),
    url = require('url'),
    path = require('path')

http.createServer((req, res) => {
    let route = router.web.get.find(route => route[0] == req.url)
    if (route) {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write(route[1]())
        res.end()
        return
    }

    //load asset
    if (req.url.match(/.css$/)) {
        res.writeHead(200, { 'Content-Type': 'text/css' })
        let cssPath = path.join(__dirname, 'public', req.url)
        let fileStream = fs.createReadStream(cssPath)
        fileStream.pipe(res)
    }else if (req.url.match(/.js$/)) {
        res.writeHead(200, { 'Content-Type': 'application/javascript' })
        let jsPath = path.join(__dirname, 'public', req.url)
        let fileStream = fs.createReadStream(jsPath)
        fileStream.pipe(res)
    }else if (req.url.match(/.ttf$/)){
        res.writeHead(200, { 'Content-Type': 'font/ttf' })
        let fontPath = path.join(__dirname, 'public', req.url)
        let fileStream = fs.createReadStream(fontPath)
        fileStream.pipe(res)
    }else if (req.url.match(/.woff$/)){
        res.writeHead(200, { 'Content-Type': 'font/woff' })
        let fontPath = path.join(__dirname, 'public', req.url)
        let fileStream = fs.createReadStream(fontPath)
        fileStream.pipe(res)
    }else if (req.url.match(/.woff2$/)){
        res.writeHead(200, { 'Content-Type': 'font/woff2' })
        let fontPath = path.join(__dirname, 'public', req.url)
        let fileStream = fs.createReadStream(fontPath)
        fileStream.pipe(res)
    }else{
        res.writeHead(404, { 'Content-Type': 'text/plain' })
        res.end("oh shit we didnt find it.")
    }


}).listen(80)
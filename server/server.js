const express = require('express')
const ReactSSR = require('react-dom/server')
const serverEntry = require('../dist/server.entry').default
const fs = require('fs')
const path = require('path')

const app = express()
const template = fs.readFileSync(path.join(__dirname,'../dist/index.html', 'utf-8'))

console.log(serverEntry)
app.use('/public', express.static(path.join(__dirname, '../dist')))

app.get('*', function(req, res) {
    const appString = ReactSSR.renderToString(serverEntry)
    res.send(template.replace('<app></app>', appString))
    res.send('dqq')
})

app.listen(3000, function() {
    console.log('server  is running at port 3000 ...')
})
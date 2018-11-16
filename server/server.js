const express = require('express')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParse = require('body-parser')
const session = require('express-session')
const serverRender = require('./util/server-render')

const app = express()
const isDev = process.env.NODE_ENV === 'development'

app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: false }))
app.use(favicon(path.join(__dirname, '../favicon.ico')))
app.use(session({
  maxAge: 10 * 60 * 1000,
  name: 'tid',
  resave: false,
  saveUninitialized: false,
  secret: 'react cnode class'
}))

app.use('/api/user', require('./util/handle_login'))
app.use('/api', require('./util/proxy'))

if (!isDev) {
  // !!!!!!!!!!!!!!!!不加require('../dist/server.entry').default,因为后面传入参数解析时用到了default
  const serverEntry = require('../dist/server.entry')
  console.log('isDev', serverEntry)
  const template = fs.readFileSync(path.join(__dirname, '../dist/server.ejs'), 'utf-8')
  app.use('/public', express.static(path.join(__dirname, '../dist')))
  app.get('*', function (req, res, next) {
    serverRender(serverEntry, template, req, res).catch(next)
  })
} else {
  const devStatic = require('./util/dev-static')
  devStatic(app)
}

app.use(function (error, req, res, next) {
  console.log(error)
  res.status(500).send(error)
})

app.listen(3000, function () {
  console.log('server is running at port 3000 ...')
})

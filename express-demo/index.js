const express = require('express')
const app = express()
const config = require('config')
const Joi = require('joi')
const logger = require('./middleware/logger')
const helmet = require('helmet')
const morgan = require('morgan')
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db')
const courses = require('./routes/courses')
const home = require('./routes/home')


app.set('view engine', 'pug')
app.set('views', './views')
app.use(express.json())
app.use(express.urlencoded({ extended: false}))
app.use(express.static('public'))
app.use(logger)
app.use(helmet())
app.use('/api/courses', courses)
app.use('/', home)

// Configuration
console.log(`App Name ${config.get('name')}`)
console.log(`Mail Server ${config.get('mail.host')}`)


if (app.get('env') === 'development') {
  app.use(morgan('tiny'))
  startupDebugger('Morgan enabled')
}

//Db work
dbDebugger('Connected to database')


app.use(function(req, res, next) {
  console.log('Authenticating')
  next()
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

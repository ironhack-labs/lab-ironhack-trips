const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const path = require('path')
const mongoose = require('mongoose')
const expressLayouts = require('express-ejs-layouts')
const authenticated = require('./middlewares/authenticated')
const pathsProvider = require('./middlewares/paths-provider')
const session = require('./middlewares/session')
const passport = require('./passport')
const rootPath = require('path').normalize(__dirname + '/../')

module.exports = app => {
  app.set('views', rootPath + 'views')
  app.set('view engine', 'ejs')
  app.set('layout','layouts/main-layout')
  app.use(expressLayouts)
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(rootPath + 'public'))
  app.use((req,res,next) => {
    res.locals.title = 'Ironhack Trips'
    next()
  })
  app.use(session(mongoose.connection))
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(authenticated)
  app.use(pathsProvider)
}
module.exports = function registerRouter(app){
  app.use('/api/movies', require('./controller/movies'))
  app.use('/api/auth', require('./controller/auth'))
  app.use('/api/verified', require('./controller/verification'))

  app.get('/api/health', (req, res) => res.send('OK').status(200))
}

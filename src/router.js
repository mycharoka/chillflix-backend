module.exports = function registerRouter(app){
  app.use('/api/movies', require('./controller/movies'))
  app.get('/api/health', (req, res) => res.send('OK').status(200))
}

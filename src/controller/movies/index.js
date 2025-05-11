const router = require('express').Router()
const moviesService = require('./service')

router.get('/', async(req, res) => {
  const result = await moviesService.getAllMovies()
  res.status(result.statusCode).send(result.data)
})

router.get('/movies/:id', async(req, res) => {
  const result = await moviesService.getMoviesById(req.params.id)
  res.status(result.statusCode).send(result.data)
})

router.patch('/movies/:id', async(req, res) => {
  const result = await moviesService.updateMoviesById(req.params.id, req.body)
  res.send(result)
})

router.delete('/movies/:id', async(req, res) => {
  const result = await moviesService.deleteMoviesById(req.params.id)
  res.status(result.statusCode).send(result.data)
})

router.post('/', async(req, res) => {
  const result = await moviesService.createMovie(req.body)
  res.status(result.statusCode).send(result.data)
})

module.exports = router
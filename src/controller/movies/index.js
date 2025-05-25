const router = require('express').Router()
const jwtAuth = require('../../middleware/jwtAuth')
const upload = require('../../middleware/multer')
const moviesService = require('./service')

router.get('/', jwtAuth, async(req, res) => {
  const result = await moviesService.getAllMovies(req.query)
  res.status(result.statusCode).send(result.data)
})

router.get('/movies/:id', jwtAuth, async(req, res) => {
  const result = await moviesService.getMoviesById(req.params.id)
  res.status(result.statusCode).send(result.data)
})

router.patch('/movies/:id', jwtAuth, async(req, res) => {
  const result = await moviesService.updateMoviesById(req.params.id, req.body)
  res.send(result)
})

router.delete('/movies/:id', jwtAuth, async(req, res) => {
  const result = await moviesService.deleteMoviesById(req.params.id)
  res.status(result.statusCode).send(result.data)
})

router.post('/', jwtAuth, upload.single('image'), async(req, res) => {
  const result = await moviesService.createMovie(req.body, req.file)
  res.status(result.statusCode).send(result.data)
})

module.exports = router
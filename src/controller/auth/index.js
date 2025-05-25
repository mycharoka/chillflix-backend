const route = require('express').Router()
const authService = require('./service')
const verification = require('../../middleware/jwtAuth')
const jwtAuth = require('../../middleware/jwtAuth')
const sendRegisterEmail = require('../../mailer/mail')
sendRegisterEmail

route.post('/register', async (req, res) => {
  const result = await authService.register(req.body);

  // Kalau register berhasil baru kirim email
  if (result.statusCode === 201 || result.statusCode === 200) {
    const { email, name } = result.data;

    const mailResult = await sendRegisterEmail(email, name);
    console.log(mailResult.data.preview); // Link Ethereal kalau perlu
  }

  res.status(result.statusCode).send(result.data);
});

route.post('/login', async(req, res) => {
  const result = await authService.login(req.body)
  res.status(result.statusCode).send(result.data)
})

route.get('/', jwtAuth, async(req, res) => {
  const result = await authService.getUser(req)
  res.status(result.statusCode).send(result.data)
})

module.exports = route
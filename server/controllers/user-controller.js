const userService = require('../service/user-service')

module.exports.singUp = async (req, res, next) => {
  try {
    const {email, password} = req.body
    const userData = await userService.registration(email, password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.status(200).json({
      message: 'success',
      user: userData
    })
  } catch (e) {
    res.status(500).json({
      message: 'error'
    })
    console.log(e)
  }
}

module.exports.login = (req, res, next) => {
  try {

  } catch (e) {
    console.log(e)
  }
}

module.exports.logout = (req, res, next) => {
  try {

  } catch (e) {
    console.log(e)
  }
}

module.exports.activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link
    await userService.activate(activationLink)
    return res.redirect(process.env.CLIENT_URL)
  } catch (e) {
    console.log(e)
  }
}

module.exports.refresh = (req, res, next) => {
  try {

  } catch (e) {
    console.log(e)
  }
}

module.exports.getUsers = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'success',
      data: [1, 4, 6]
    })
  } catch (e) {
    console.log(e)
  }
}
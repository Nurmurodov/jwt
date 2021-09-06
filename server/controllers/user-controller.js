const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api-error')

module.exports.singUp = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
      return next(ApiError.BadRequest("Validation error",errors.array()))
    }
    const {email, password} = req.body
    const userData = await userService.registration(email, password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.status(200).json({
      message: 'success',
      user: userData
    })
  } catch (e) {
    next(e)
  }
}

module.exports.login = async (req, res, next) => {
  try {
    const {email,password} = req.body
    const userData = await userService.login(email,password)
    res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    return res.status(200).json({
      message: 'success',
      user: userData
    })
  } catch (e) {
    next(e)
  }
}

module.exports.logout = (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
}

module.exports.activate = async (req, res, next) => {
  try {
    const activationLink = req.params.link
    await userService.activate(activationLink)
    return res.redirect(process.env.CLIENT_URL)
  } catch (e) {
    next(e)
  }
}

module.exports.refresh = (req, res, next) => {
  try {

  } catch (e) {
    next(e)
  }
}

module.exports.getUsers = (req, res, next) => {
  try {
    res.status(200).json({
      message: 'success',
      data: [1, 4, 6]
    })
  } catch (e) {
    next(e)
  }
}
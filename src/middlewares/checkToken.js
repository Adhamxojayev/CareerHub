import jwt from '../utils/jwt.js'

export default (req, res, next) => {
  try {
    const { token } = req.headers
    if(!token){
      throw new Error('token required')
    }

    const { employerId } = jwt.verify(token)
    
    if(!employerId){
      throw new Error('Forbidden')
    }

    req.employerId = employerId

    next()
  } catch (error) {
    return next(error)
  }
}

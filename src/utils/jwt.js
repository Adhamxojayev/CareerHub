import jwt from 'jsonwebtoken';

export default {
  sign: (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_TIME }),
  verify: (token) => jwt.verify(token, process.env.JWT_SECRET)
}

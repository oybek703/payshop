import { sign } from 'jsonwebtoken'

export const createActivationToken = (payload: unknown) => {
  return sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '2d'
  })
}

export const createResetToken = (payload: unknown) => {
  return sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: '6h'
  })
}

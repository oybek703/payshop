import { sign } from 'jsonwebtoken'

export const createActivationToken = (payload: unknown) => {
  return sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: '2d'
  })
}

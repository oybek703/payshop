import { sign, verify } from 'jsonwebtoken'
import User from '@/models/User'
import { connectDb, disconnectDb } from '@/utils/database'

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

export const verifyEmail = async activationToken => {
  const { id } = await verify(activationToken, process.env.ACTIVATION_TOKEN_SECRET)
  await connectDb()
  const user = await User.findById(id)
  user.emailVerified = true
  await user.save()
  await disconnectDb()
}

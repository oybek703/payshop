import nc from 'next-connect'
import { NextRequest, NextResponse } from 'next/server'
import { connectDb, disconnectDb } from '@/utils/database'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { hash } from 'bcrypt'
import { createActivationToken, createResetToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/emails/send-email'
import { activateEmailTemplate } from '@/utils/emails/activate-email-template'
import { resetPasswordTemplate } from '@/utils/emails/reset-password-template'

const handler = nc()

handler.put(async (req: NextRequest, res: NextResponse, next) => {
  try {
    await connectDb()
    const { userId, password } = req.body
    const user = await User.findById(userId)
    console.log(userId, password, user)
    if (!user) {
      return res.status(400).send({ message: 'Account does not exist!' })
    }
    const hashedPassword = await hash(password, 12)
    await user.updateOne({ password: hashedPassword })
    await disconnectDb()
    res.json({ email: user.email })
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
})

export default handler

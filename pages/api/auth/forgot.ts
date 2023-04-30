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

handler.post(async (req: NextRequest, res: NextResponse, next) => {
  try {
    await connectDb()
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).send({ message: 'Email address does not exist!' })
    }
    const resetToken = createResetToken({ id: user._id.toString() })
    const url = `${process.env.BASE_URL}/auth/reset/${resetToken}`
    await sendEmail(email, url, '', 'Reset your password', resetPasswordTemplate(url))
    await disconnectDb()
    res.json({ message: 'Password reset link sent to your email!' })
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
})

export default handler

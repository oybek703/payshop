import { connectDb, disconnectDb } from '@/utils/database'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { hash } from 'bcrypt'
import { createActivationToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/emails/send-email'
import { resetPasswordTemplate } from '@/utils/emails/reset-password-template'
import { activateEmailTemplate } from '@/utils/emails/activate-email-template'
import { createResetToken } from '@/utils/tokens'

export const POST = async (request: Request) => {
  try {
    await connectDb()
    const { email } = await request.json()
    const user = await User.findOne({ email })
    if (!user) {
      return new Response(JSON.stringify({ message: 'Email address does not exist!' }), {
        status: 400
      })
    }
    const resetToken = createResetToken({ id: user._id.toString() })
    const url = `${process.env.BASE_URL}/auth/reset/${resetToken}`
    await sendEmail(email, url, '', 'Reset your password', resetPasswordTemplate(url))
    await disconnectDb()
    return new Response(JSON.stringify({ message: 'Password reset link sent to your email!' }))
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new Response(JSON.stringify({ message: e.message }), { status: 500 })
    }
  }
}

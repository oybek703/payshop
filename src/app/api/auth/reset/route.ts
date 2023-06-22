import { connectDb, disconnectDb } from '@/utils/database'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { hash } from 'bcrypt'
import { createActivationToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/emails/send-email'
import { resetPasswordTemplate } from '@/utils/emails/reset-password-template'
import { activateEmailTemplate } from '@/utils/emails/activate-email-template'
import { createResetToken } from '@/utils/tokens'

export const PUT = async (request: Request) => {
  try {
    await connectDb()
    const { userId, password } = await request.json()
    const user = await User.findById(userId)
    if (!user) {
      return new Response(JSON.stringify({ message: 'Account does not exist!' }), {
        status: 400
      })
    }
    const hashedPassword = await hash(password, 12)
    await user.updateOne({ password: hashedPassword })
    await disconnectDb()
    return new Response(JSON.stringify({ email: user.email }))
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new Response(JSON.stringify({ message: e.message }), { status: 500 })
    }
  }
}

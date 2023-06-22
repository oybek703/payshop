import { connectDb, disconnectDb } from '@/utils/database'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { hash } from 'bcrypt'
import { createActivationToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/emails/send-email'
import { activateEmailTemplate } from '@/utils/emails/activate-email-template'

export const POST = async (request: Request) => {
  try {
    await connectDb()
    const { name, email, password } = await request.json()
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ message: 'Please fill in all fields!' }), {
        status: 400
      })
    }
    if (!validateEmail(email)) {
      return new Response(JSON.stringify({ message: 'Invalid email!' }), { status: 400 })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return new Response(JSON.stringify({ message: 'Email address already exists!' }), {
        status: 400
      })
    }
    if (password.length < 6) {
      return new Response(
        JSON.stringify({ message: 'Password must be at least 6 characters long!' }),
        { status: 400 }
      )
    }
    const hashedPassword = await hash(password, 12)
    const user = new User({ email, name, password: hashedPassword })
    const newUser = await user.save()
    const activationToken = createActivationToken({ id: newUser._id.toString() })
    const url = `${process.env.BASE_URL}/activate/${activationToken}`
    await sendEmail(email, url, '', 'Activate your account!', activateEmailTemplate(email, url))
    await disconnectDb()
    return new Response(
      JSON.stringify({ message: 'Register success. Please activate your email to start!' })
    )
  } catch (e: unknown) {
    if (e instanceof Error) {
      return new Response(JSON.stringify({ message: e.message }), { status: 500 })
    }
  }
}

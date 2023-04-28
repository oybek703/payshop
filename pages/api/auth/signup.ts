import nc from 'next-connect'
import { NextRequest, NextResponse } from 'next/server'
import { connectDb, disconnectDb } from '@/utils/database'
import { validateEmail } from '@/utils/validation'
import User from '@/models/User'
import { hash } from 'bcrypt'
import { createActivationToken } from '@/utils/tokens'
import { sendEmail } from '@/utils/emails/send-email'

const handler = nc()

handler.post(async (req: NextRequest, res: NextResponse, next) => {
  try {
    await connectDb()
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.status(400).send({ message: 'Please fill in all fields!' })
    }
    if (!validateEmail(email)) {
      return res.status(400).send({ message: 'Invalid email!' })
    }
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).send({ message: 'Email address already exists!' })
    }
    if (password.length < 6) {
      return res.status(400).send({ message: 'Password must be at least 6 characters long!' })
    }
    const hashedPassword = await hash(password, 12)
    const user = new User({ email, name, password: hashedPassword })
    const newUser = await user.save()
    const activationToken = createActivationToken({ id: newUser._id.toString() })
    const url = `${process.env.BASE_URL}/activate${activationToken}`
    await sendEmail(email, url, '', 'Activate your account!')
    await disconnectDb()
    res.json({ message: 'Register success. Please activate your email to start!' })
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ message: e.message })
    }
  }
})

export default handler

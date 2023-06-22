import { NextAuthOptions } from 'next-auth'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/app/api/auth/lib/mongodb'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import Auth0Provider from 'next-auth/providers/auth0'
import { compare } from 'bcrypt'

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as any,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials as { email: string; password: string }
        const user = await User.findOne({ email })
        if (!user) throw new Error('Email address does not exist!')
        return signInUser({ password, user })
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    })
  ],
  pages: {
    signIn: '/login',
    error: 'login'
  },
  session: {
    strategy: 'jwt'
  },
  secret: process.env.JWT_SECRET
}

const signInUser = async ({ user, password }) => {
  if (!password) throw new Error('Please enter your password!')
  const isValidPassword = await compare(password, user.password)
  if (!isValidPassword) throw new Error('Invalid credentials!')
  return user
}

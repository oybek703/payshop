import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import clientPromise from '@/pages/api/auth/lib/mongodb'
import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import GoogleProvider from 'next-auth/providers/google'
import Auth0Provider from 'next-auth/providers/auth0'
import CredentialsProvider from 'next-auth/providers/credentials'
import User from '@/models/User'
import { compare } from 'bcrypt'
import { connectDb } from '@/utils/database'

connectDb()

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const { email, password } = credentials
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
  callbacks: {
    async session({ session, token }) {
      const user = await User.findById(token.sub)
      session.user.id = token.sub || user._id.toString()
      session.user.role = user.role || 'user'
      return session
    }
  },
  pages: {
    signIn: '/signin'
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

export default NextAuth(authOptions)

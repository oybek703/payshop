import NextAuth from 'next-auth'
import { connectDb } from '@/utils/database'
import { authOptions } from '@/app/api/auth/lib/autOptions'

connectDb()

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

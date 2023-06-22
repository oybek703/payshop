import ResetPassword from '@/components/ResetPassword'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/lib/autOptions'
import { redirect } from 'next/navigation'
import { ApiRoutes } from '@/interfaces/api-routes'
import { decode } from 'jsonwebtoken'

const Reset = async ({ params: { token } }) => {
  const session = await getServerSession(authOptions as any)
  if (session) redirect(ApiRoutes.home)
  const { id: userId } = await decode(token)
  return <ResetPassword userId={userId} />
}

export default Reset

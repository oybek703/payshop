import React, { memo } from 'react'
import AuthPage from '@/components/AuthPage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/lib/autOptions'
import { getCsrfToken, getProviders } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { ApiRoutes } from '@/interfaces/api-routes'

const Login = async ({ searchParams: { callbackUrl } }) => {
  const session = await getServerSession(authOptions as any)
  const csrfToken = await getCsrfToken()
  const providers = await getProviders()
  if (session) redirect(ApiRoutes.home)
  return <AuthPage csrfToken={csrfToken} providers={providers} callbackUrl={callbackUrl} />
}

export default memo(Login)

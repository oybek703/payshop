import React from 'react'
import ActivationRedirect from '@/components/VerifyEmail'
import { verifyEmail } from '@/utils/tokens'

const ActivateEmail = async ({
  params: { activationToken }
}: {
  params: { activationToken: string }
}) => {
  await verifyEmail(activationToken)
  return <ActivationRedirect />
}

export default ActivateEmail

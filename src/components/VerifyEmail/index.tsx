'use client'
import React, { useEffect } from 'react'
import styles from './verify-email.module.scss'
import { useRouter } from 'next/navigation'
import { ApiRoutes } from '@/interfaces/api-routes'

const ActivationRedirect = () => {
  const { push } = useRouter()
  useEffect(() => {
    setTimeout(() => {
      push(ApiRoutes.home)
    }, 2000)
  }, [])
  return (
    <div className={styles.container}>
      <p className={styles.success}>Your email verified successfully. Redirecting you...</p>
    </div>
  )
}

export default ActivationRedirect

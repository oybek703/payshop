'use client'
import React, { useState } from 'react'
import styles from './forgot.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Link from 'next/link'
import { ApiRoutes } from '@/interfaces/api-routes'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import LoaderSpinner from '@/components/Loader'
import CircledIconBtn from '@/components/CircledIconBtn'
import LoginInput from '@/components/LoginInput'

const loginValidation = Yup.object({
  email: Yup.string()
    .required('Please enter email address!')
    .email('Please enter valid email address!')
})

const Forgot = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const handleForgotPassword = async () => {
    try {
      setError('')
      setSuccess('')
      setLoading(true)
      const { data } = await axios.post('/api/auth/forgot', { email })
      setSuccess(data.message)
      setLoading(false)
    } catch (e) {
      console.log(e)
      setLoading(false)
      if (e instanceof Error) {
        if (e instanceof AxiosError) {
          setError(e.response.data.message)
        }
      }
    }
  }
  return (
    <>
      {loading && <LoaderSpinner loading={loading} />}
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot__header}>
            <Link href={ApiRoutes.signIn} className={styles.back__svg}>
              <BiLeftArrowAlt />
            </Link>
            <span>
              Remember your password ? <Link href={ApiRoutes.signIn}> Login instead! </Link>
            </span>
          </div>
        </div>
        <Formik
          onSubmit={handleForgotPassword}
          validationSchema={loginValidation}
          enableReinitialize
          initialValues={{ email }}
        >
          {form => (
            <Form method="post">
              <LoginInput
                type="email"
                name="email"
                icon="email"
                placeholder="Email address..."
                onChange={({ target: { value } }) => setEmail(value)}
              />
              <CircledIconBtn type="submit" text="Send link" />
              <div className={styles.error}>{error && <span>{error}</span>}</div>
              <div className={styles.success}>{success && <span>{success}</span>}</div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}

export default Forgot

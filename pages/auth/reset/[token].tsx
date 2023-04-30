import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import { decode } from 'jsonwebtoken'
import * as Yup from 'yup'
import axios, { AxiosError } from 'axios'
import LoaderSpinner from '@/components/loaders/loader-spinner'
import Header from '@/components/header'
import styles from '@/styles/forgot.module.scss'
import Link from 'next/link'
import { ApiRoutes } from '@/interfaces/api-routes'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { Form, Formik } from 'formik'
import LoginInput from '@/components/login/login-input'
import CircledIconBtn from '@/components/buttons/circled-icon-btn'
import Footer from '@/components/footer'
import { getSession, signIn } from 'next-auth/react'

const passwordValidation = Yup.object({
  password: Yup.string()
    .required('Please enter at least 6 numbers, letters and punctuation marks(such as ! and &).')
    .min(6, 'Password must be at least contain 6 characters!')
    .max(36, 'Password can not be more than 36 characters!'),
  confPassword: Yup.string()
    .required('Confirm your password!')
    .oneOf([Yup.ref('password')], 'Password should match!')
})

const Reset = ({ userId }: IResetProps) => {
  const [password, setPassword] = useState<string>('')
  const [confPassword, setConfPassword] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const handleResetPassword = async () => {
    try {
      setError('')
      setLoading(true)
      const { data } = await axios.put('/api/auth/reset', { userId, password })
      await signIn('credentials', { redirect: false, email: data.email, password })
      setLoading(false)
      window.location.reload()
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
      <Header />
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
          onSubmit={handleResetPassword}
          validationSchema={passwordValidation}
          enableReinitialize
          initialValues={{ password, confPassword }}
        >
          {form => (
            <Form method="post">
              <LoginInput
                type="password"
                name="password"
                icon="password"
                placeholder="New password..."
                onChange={({ target: { value } }) => setPassword(value)}
              />
              <LoginInput
                type="password"
                name="confPassword"
                icon="password"
                placeholder=" Confirm new password..."
                onChange={({ target: { value } }) => setConfPassword(value)}
              />
              <CircledIconBtn type="submit" text="Update" />
              <div className={styles.error}>{error && <span>{error}</span>}</div>
            </Form>
          )}
        </Formik>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<IResetProps> = async ({ req, query }) => {
  const { token } = query
  const session = await getSession({ req })
  if (session) {
    return {
      redirect: {
        destination: ApiRoutes.home
      }
    }
  }
  const { id: userId } = await decode(token as string)
  return {
    props: { userId }
  }
}

interface IResetProps extends Record<unknown, string> {
  userId: string
}

export default Reset

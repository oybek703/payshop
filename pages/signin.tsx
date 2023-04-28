import React, { FormEvent, useState } from 'react'
import Header from '@/components/header'
import Footer from '@/components/footer'
import styles from '@/styles/signin.module.scss'
import { BiLeftArrowAlt } from 'react-icons/bi'
import Link from 'next/link'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import LoginInput from '@/components/login/login-input'
import CircledIconBtn from '@/components/buttons/circled-icon-btn'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getCsrfToken, getProviders, getSession, signIn } from 'next-auth/react'
import Image from 'next/image'
import axios, { AxiosError } from 'axios'
import LoaderSpinner from '@/components/loaders/hash-loader'

interface IInitialValues {
  login_email: string
  login_password: string
  name: string
  email: string
  password: string
  conf_password: string
  success: string
  error: string
  login_error: string
}

const initialValues: IInitialValues = {
  login_email: '',
  login_password: '',
  name: '',
  email: '',
  password: '',
  conf_password: '',
  success: '',
  error: '',
  login_error: ''
}

const loginValidation = Yup.object({
  login_email: Yup.string()
    .required('Email address is required!')
    .email('Please enter valid email address!'),
  login_password: Yup.string().required('Please enter a password!')
})
const registerValidation = Yup.object({
  name: Yup.string()
    .required('Please enter your full name!')
    .min(2, 'Full name must be between 2 and 16 characters!')
    .max(16, 'Full name must be between 2 and 16 characters!')
    .matches(/^[aA-zZ]/, 'Numbers and special characters is not allowed!'),
  email: Yup.string()
    .required('You will need this if you login and if you ever reset your password!')
    .email('Please enter valid email address!'),
  password: Yup.string()
    .required('Please enter at least 6 numbers, letters and punctuation marks(such as ! and &).')
    .min(6, 'Password must be at least contain 6 characters!')
    .max(36, 'Password can not be more than 36 characters!'),
  conf_password: Yup.string()
    .required('Confirm your password!')
    .oneOf([Yup.ref('password')], 'Password should match!')
})

const SignIn = ({ providers, callbackUrl, csrfToken }: SignInProps) => {
  const { push } = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<IInitialValues>(initialValues)
  const {
    login_email,
    login_password,
    email,
    password,
    conf_password,
    name,
    success,
    error,
    login_error
  } = user
  const handleChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget
    setUser({ ...user, [name]: value })
  }
  const handleSignUp = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post('/api/auth/signup', { name, email, password })
      setUser({ ...user, error: '', success: data.message })
      setLoading(false)
      setTimeout(async function () {
        await signIn('credentials', { redirect: false, email, password })
        setUser({ ...user, error: '', success: '' })
        await push(callbackUrl || '/')
      }, 1000)
    } catch (e) {
      setLoading(false)
      if (e instanceof Error) {
        if (e instanceof AxiosError) {
          setUser({ ...user, success: '', error: e.response.data.message })
        }
      }
    }
  }
  const handleSignIn = async () => {
    setLoading(true)
    const res = await signIn('credentials', {
      redirect: false,
      email: login_email,
      password: login_password
    })
    setUser({ ...user, error: '', success: '' })
    if (res.error) {
      setLoading(false)
      setUser({ ...user, login_error: res.error })
    } else {
      setLoading(false)
      return push(callbackUrl || '/')
    }
  }
  return (
    <>
      {loading && <LoaderSpinner loading={loading} />}
      <Header />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We&apos;d be happy to join us! <Link href="/">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <p>Get access to one of the best EShopping services in the world!</p>
            <Formik
              onSubmit={handleSignIn}
              validationSchema={loginValidation}
              enableReinitialize
              initialValues={{ login_email, login_password }}
            >
              {form => (
                <Form method="post" action="/api/auth/signin/email">
                  <input type="hidden" name="csrfToken" defaultValue={csrfToken} />
                  <LoginInput
                    type="email"
                    name="login_email"
                    icon="email"
                    placeholder="Email address..."
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password..."
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign In" />
                  <div className={styles.error}>{login_email && <span>{login_error}</span>}</div>
                  <div className={styles.forgot}>
                    <Link href="/forgot">Forgot password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          <div className={styles.login__socials}>
            <span className={styles.login__socials__continue_with}>Or continue with</span>
            <div className={styles.login__socials_wrap}>
              {Object.values(providers).map(provider => (
                <div key={provider.name}>
                  {provider.name !== 'Credentials' && (
                    <button className={styles.social_btn} onClick={() => signIn(provider.id)}>
                      <Image
                        src={`/images/${provider.name}.png`}
                        alt={provider.name}
                        width={36}
                        height={36}
                      />
                      Sign in with {provider.name}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <p>Get access to one of the best EShopping services in the world!</p>
            <Formik
              onSubmit={handleSignUp}
              validationSchema={registerValidation}
              enableReinitialize
              initialValues={{ name, email, password, conf_password }}
            >
              {form => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full name..."
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="email"
                    name="email"
                    icon="email"
                    placeholder="Email address..."
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password..."
                    onChange={handleChange}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Repeat password..."
                    onChange={handleChange}
                  />
                  <CircledIconBtn type="submit" text="Sign Up" />
                </Form>
              )}
            </Formik>
            <div className={styles.success}>{success && <span>{success}</span>}</div>
            <div className={styles.error}>{error && <span>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export const getServerSideProps: GetServerSideProps<SignInProps> = async context => {
  const { req, query } = context
  const providers = await getProviders()
  const session = await getSession({ req })
  const { callbackUrl } = query
  const csrfToken = await getCsrfToken({ req })
  if (session) {
    return {
      redirect: {
        destination: callbackUrl || '/'
      }
    }
  }
  return {
    props: { providers, callbackUrl, csrfToken }
  }
}

interface SignInProps extends Record<string, unknown> {
  providers: ReturnType<typeof getProviders>
  callbackUrl: string
  csrfToken: string
}

export default SignIn

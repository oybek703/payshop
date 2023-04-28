import React from 'react'
import styles from './login-input.module.scss'
import { BiUser } from 'react-icons/bi'
import { SiMinutemailer } from 'react-icons/si'
import { IoKeyOutline } from 'react-icons/io5'
import { ErrorMessage, FieldHookConfig, useField } from 'formik'

interface ILoginInterfaceProps {
  icon: 'email' | 'user' | 'password'
  placeholder?: string
}

const LoginInput = ({ icon, placeholder, ...props }: ILoginInterfaceProps) => {
  const [field, meta] = useField(props as FieldHookConfig<any>)
  return (
    <div className={`${styles.input} ${meta.touched && meta.error ? styles.error : ''}`}>
      {icon === 'user' && <BiUser />}
      {icon === 'email' && <SiMinutemailer />}
      {icon === 'password' && <IoKeyOutline />}
      <input type={field.type} name={field.name} placeholder={placeholder} {...field} {...props} />
      {meta.touched && meta.error && (
        <div className={styles.error__popup}>
          <span />
          <ErrorMessage name={field.name} />
        </div>
      )}
    </div>
  )
}

export default LoginInput

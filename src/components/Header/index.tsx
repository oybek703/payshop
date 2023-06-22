'use client'
import React, { useEffect } from 'react'
import styles from './header.module.scss'
import Ad from '@/components/Header/Ad'
import Top from '@/components/Header/Top'
import HeaderMain from '@/components/Header/HeaderMain'
import { ICountry } from '@/interfaces/ip-detection.interfaces'
import useActions from '@/redux/hooks'
import { ISession } from '@/interfaces/auth.interfaces'

const Header = ({ country, session }: { country: ICountry | undefined; session: ISession }) => {
  const { setCountry } = useActions()
  useEffect(() => {
    if (country) setCountry(country)
    //  eslint-disable-next-line
  }, [])
  return (
    <header className={styles.header}>
      <Ad />
      <Top session={session} />
      <HeaderMain />
    </header>
  )
}

export default Header

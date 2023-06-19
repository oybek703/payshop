'use client'
import React, { useEffect } from 'react'
import styles from './footer.module.scss'
import Links from '@/components/Footer/Links'
import Socials from '@/components/Footer/Socials'
import NewsLetter from '@/components/Footer/NewsLetter'
import Payment from '@/components/Footer/Payment'
import Copyright from '@/components/Footer/Copyright'
import useActions from '@/redux/hooks'
import { ICountry } from '@/interfaces/ip-detection.interfaces'

const Footer = ({ country }: { country: ICountry | undefined }) => {
  const { setCountry } = useActions()
  useEffect(() => {
    if (country) setCountry(country)
  }, [])
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Payment />
        <Copyright />
      </div>
    </footer>
  )
}

export default Footer

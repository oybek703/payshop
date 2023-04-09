import React from 'react'
import styles from './footer.module.scss'
import Links from '@/components/footer/Links'
import Socials from '@/components/footer/Socials'
import NewsLetter from '@/components/footer/NewsLetter'
import Payment from '@/components/footer/Payment'
import Copyright from '@/components/footer/Copyright'

const Footer = () => {
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

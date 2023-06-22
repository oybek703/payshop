import React from 'react'
import styles from './header.module.scss'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import AccountPart from '@/components/Header/AccountPart'
import CountryPart from '@/components/Header/CountryPart'
import { ISession } from '@/interfaces/auth.interfaces'

const Top = ({ session }: { session: ISession }) => {
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div />
        <ul className={styles.top__list}>
          <CountryPart />
          <li className={styles.li}>
            <MdSecurity />
            <span>Buyer protection</span>
          </li>
          <li className={styles.li}>
            <span>Customer service</span>
          </li>
          <li className={styles.li}>
            <span>Help</span>
          </li>
          <li className={styles.li}>
            <BsSuitHeart />
            <span>Wishlist</span>
          </li>
          <AccountPart />
        </ul>
      </div>
    </div>
  )
}

export default Top

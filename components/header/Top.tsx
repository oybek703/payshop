import React, { useState } from 'react'
import styles from './header.module.scss'
import Image from 'next/image'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import UserMenu from '@/components/header/UserMenu'

const Top = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(true)
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div />
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image width={20} height={20} src="/images/flag.png" alt={'Country logo'} />
            <span>Uzbekistan / usd</span>
          </li>
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
          <div
            className={styles.li}
            onMouseOver={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            {loggedIn ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <Image width={20} height={20} src="/images/user.png" alt="Avatar" />
                  <span>John Doe</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            ) : (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <RiAccountCircleLine />
                  <span>Account</span>
                  <RiArrowDropDownFill />
                </div>
              </li>
            )}
            {visible && <UserMenu loggedIn={loggedIn} />}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Top

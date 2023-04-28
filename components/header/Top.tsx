import React, { useState } from 'react'
import styles from './header.module.scss'
import Image from 'next/image'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import UserMenu from '@/components/header/UserMenu'
import { useSession } from 'next-auth/react'
import { ISession } from '@/interfaces/auth.interfaces'

const Top = () => {
  const { data: session } = useSession()
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div />
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image
              width={20}
              height={20}
              // src={flag}
              src="/images/flag.png"
              alt={'Country name'}
            />
            {/* TODO Set location by ip address */}
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
            {session ? (
              <li className={styles.li}>
                <div className={styles.flex}>
                  <Image
                    width={20}
                    height={20}
                    src={session.user?.image}
                    alt={session.user?.name}
                  />
                  <span>{session.user?.name}</span>
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
            {visible && <UserMenu session={session as ISession} />}
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Top

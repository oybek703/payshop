'use client'
import React, { useState } from 'react'
import styles from '@/components/Header/header.module.scss'
import Image from 'next/image'
import { RiAccountCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import UserMenu from '@/components/Header/UserMenu'
import { useSession } from 'next-auth/react'

const AccountPart = () => {
  const { data: session } = useSession()
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div
      className={styles.li}
      onMouseOver={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {session ? (
        <li className={styles.li}>
          <div className={styles.flex}>
            <Image width={20} height={20} src={session.user.image} alt={session.user.name} />
            <span>{session.user.name}</span>
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
      {visible && <UserMenu />}
    </div>
  )
}

export default AccountPart

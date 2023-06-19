import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { RiSearch2Line } from 'react-icons/ri'
import { FaOpencart } from 'react-icons/fa'
import { ApiRoutes } from '@/interfaces/api-routes'

const HeaderMain = () => {
  return (
    <div className={styles.main}>
      <div className={styles.main__container}>
        <Link href={ApiRoutes.home} className={styles.logo}>
          <Image src="/images/logo.png" alt="Logo" width={170} height={30} />
        </Link>
        <div className={styles.search}>
          <input type="text" placeholder="Search..." />
          <div className={styles.search__icon}>
            <RiSearch2Line />
          </div>
        </div>
        <Link className={styles.cart} href={ApiRoutes.cart}>
          <FaOpencart />
          <span>0</span>
        </Link>
      </div>
    </div>
  )
}

export default HeaderMain

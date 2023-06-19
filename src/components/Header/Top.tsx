'use client'
import React, { useState } from 'react'
import styles from './header.module.scss'
import Image from 'next/image'
import { MdSecurity } from 'react-icons/md'
import { BsSuitHeart } from 'react-icons/bs'
import { RiAccountCircleLine, RiArrowDropDownFill } from 'react-icons/ri'
import UserMenu from '@/components/header/UserMenu'
import { useAppSelector } from '@/redux/hooks'

const Top = () => {
  const { name, flag, currency } = useAppSelector(state => state.country)
  return (
    <div className={styles.top}>
      <div className={styles.top__container}>
        <div />
        <ul className={styles.top__list}>
          <li className={styles.li}>
            <Image width={20} height={20} src={flag} alt={name} />
            <span>
              {name} / {currency}
            </span>
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
          <div className={styles.li}>
            <li className={styles.li}>
              <div className={styles.flex}>
                <RiAccountCircleLine />
                <span>Account</span>
                <RiArrowDropDownFill />
              </div>
            </li>
          </div>
        </ul>
      </div>
    </div>
  )
}

export default Top

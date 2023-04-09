import React from 'react'
import styles from './header.module.scss'
import Image from 'next/image'
import Link from 'next/link'

const UserMenu = ({ loggedIn }) => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Pay Shop</h4>
      {loggedIn ? (
        <div className={styles.flex}>
          <Image
            className={styles.menu__img}
            src="/images/user.png"
            alt="Avatar"
            width={20}
            height={20}
          />
          <div className={styles.col}>
            <span>Welcome back.</span>
            <h3>JD23711</h3>
            <span>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className={styles.btn__primary}>Register</button>
          <button className={styles.btn__outline}>Login</button>
        </div>
      )}
      <ul>
        <li>
          <Link href="/profile">Account</Link>
        </li>
        <li>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li>
          <Link href="/profile/address">Address</Link>
        </li>
        <li>
          <Link href="/profile/wishlist">Wishlist</Link>
        </li>
      </ul>
    </div>
  )
}

export default UserMenu

import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'

const UserMenu = () => {
  return (
    <div className={styles.menu}>
      <h4>Welcome to Pay Shop</h4>
      <div className={styles.flex}>
        <button className="btn__primary">Register</button>
        <button className="btn__outline">Login</button>
      </div>
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

'use client'
import React from 'react'
import styles from './header.module.scss'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'

const UserMenu = () => {
  const { data: session } = useSession()
  return (
    <div className={styles.menu}>
      <h4>Welcome to Pay Shop</h4>
      {session ? (
        <div className={styles.flex}>
          <Image
            className={styles.menu__img}
            src={session.user?.image as any}
            alt={session.user?.name as any}
            width={20}
            height={20}
          />
          <div className={styles.col}>
            <span>Welcome back.</span>
            <h3>{session.user?.name}</h3>
            <span onClick={() => signOut()}>Sign out</span>
          </div>
        </div>
      ) : (
        <div className={styles.flex}>
          <button className="btn__primary">Register</button>
          <button onClick={() => signIn()} className="btn__outline">
            Login
          </button>
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

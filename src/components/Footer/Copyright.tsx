'use client'
import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'
import { IoLocationSharp } from 'react-icons/io5'
import { useAppSelector } from '@/redux/hooks'

const data: { name: string; link: string }[] = [
  { name: 'Privacy Center', link: '' },
  { name: 'Privacy & Cookie Policy', link: '' },
  { name: 'Manage Cookies', link: '' },
  { name: 'Terms & Conditions', link: '' },
  { name: 'Copyright Notice', link: '' }
]

const Copyright = () => {
  const { name } = useAppSelector(state => state.country)
  return (
    <div className={styles.footer__copyright}>
      <section>&copy; PAYSHOP ALL RIGHTS RESERVED.</section>
      <section>
        <ul>
          {data.map(({ link, name }) => (
            <li key={name}>
              <Link href={link}>{name}</Link>
            </li>
          ))}
          <li>
            <a>
              <IoLocationSharp /> {name}
            </a>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default Copyright

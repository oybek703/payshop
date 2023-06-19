import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const links: { heading: string; links: { name: string; link: string }[] }[] = [
  {
    heading: 'Pay Shop',
    links: [
      { name: 'About us', link: '' },
      { name: 'Contact us', link: '' },
      { name: 'Social Responsibility', link: '' },
      { name: '', link: '' }
    ]
  },
  {
    heading: 'Help and Support',
    links: [
      { name: 'Shipping Info', link: '' },
      { name: 'Returns', link: '' },
      { name: 'How to order', link: '' },
      { name: 'Size guide', link: '' }
    ]
  },
  {
    heading: 'Custormer Service',
    links: [
      { name: 'Customer Service', link: '' },
      { name: 'Terms and Conditions', link: '' },
      { name: 'Consumers (Transactions)', link: '' },
      { name: 'Take our feedback Survey', link: '' }
    ]
  }
]

const Links = () => {
  return (
    <div className={styles.footer__links}>
      {links.map(({ heading, links: innerLinks }, index) => (
        <ul key={heading}>
          {index === 0 ? (
            <Image alt="Logo" src="/images/logo.png" width={170} height={30} />
          ) : (
            <b>{heading}</b>
          )}
          {innerLinks.map(({ link, name }) => (
            <li key={name}>
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  )
}

export default Links

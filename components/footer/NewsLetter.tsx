import React from 'react'
import styles from './footer.module.scss'
import Link from 'next/link'
import Image from 'next/image'

const NewsLetter = () => {
  return (
    <div className={styles.footer__newsletter}>
      <h3>SIGN UP FOR OUR NEWSLETTER</h3>
      <div className={styles.footer__flex}>
        <input type="text" placeholder="Your email address..." />
        <button className={styles.btn__primary}>SUBSCRIBE</button>
      </div>
      <p>
        By clicking the SUBSCRIBE button you are agreeing to
        <Link href="/"> Our privacy & Cookie Policy</Link>
      </p>
    </div>
  )
}

export default NewsLetter

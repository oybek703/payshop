import React from 'react'
import styles from './footer.module.scss'
import Image from 'next/image'

const Payment = () => {
  return (
    <div className={styles.footer__payment}>
      <h3> WE ACCEPT</h3>
      <div className={styles.footer__flexwrap}>
        <Image src="/images/visa.png" alt="Visa" width={60} height={36} />
        <Image src="/images/mastercard.png" alt="Mastercard" width={60} height={36} />
        <Image src="/images/paypal.png" alt="Paypal" width={60} height={36} />
      </div>
    </div>
  )
}

export default Payment

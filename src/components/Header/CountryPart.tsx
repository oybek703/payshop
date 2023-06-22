import React from 'react'
import styles from '@/components/Header/header.module.scss'
import Image from 'next/image'
import { useAppSelector } from '@/redux/hooks'

const CountryPart = () => {
  const { name, flag, currency } = useAppSelector(state => state.country)
  return (
    <li className={styles.li}>
      <Image width={20} height={20} src={flag} alt={name} />
      <span>
        {name} / {currency}
      </span>
    </li>
  )
}

export default CountryPart

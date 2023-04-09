import React from 'react'
import styles from './header.module.scss'
import Ad from '@/components/header/Ad'
import Top from '@/components/header/Top'
import HeaderMain from '@/components/header/HeaderMain'
import { ICountry } from '@/interfaces/ip-detection.interfaces'

const Header = (country: ICountry) => {
  return (
    <header className={styles.header}>
      <Ad />
      <Top {...country} />
      <HeaderMain />
    </header>
  )
}

export default Header

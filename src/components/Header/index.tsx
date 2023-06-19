'use client'
import React, { useEffect } from 'react'
import styles from './header.module.scss'
import Ad from '@/components/Header/Ad'
import Top from '@/components/Header/Top'
import HeaderMain from '@/components/Header/HeaderMain'
import { ICountry } from '@/interfaces/ip-detection.interfaces'
import useActions from '@/redux/hooks'

const Header = ({ country }: { country: ICountry | undefined }) => {
  const { setCountry } = useActions()
  useEffect(() => {
    if (country) setCountry(country)
  }, [])
  return (
    <header className={styles.header}>
      <Ad />
      <Top />
      <HeaderMain />
    </header>
  )
}

export default Header

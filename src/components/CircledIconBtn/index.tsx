import React from 'react'
import styles from './circled-icon-btn.module.scss'
import { BiRightArrowAlt } from 'react-icons/bi'

interface ICircledBtnProps {
  text: string
  type: 'submit' | 'reset' | 'button' | undefined
}

const CircledIconBtn = ({ text, type }: ICircledBtnProps) => {
  return (
    <button className={styles.button} type={type}>
      {text}
      <span className={styles.svg__wrap}>
        <BiRightArrowAlt />
      </span>
    </button>
  )
}

export default CircledIconBtn

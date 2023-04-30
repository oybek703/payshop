import React from 'react'
import { MoonLoader } from 'react-spinners'
import styles from './loader-spinner.module.scss'

const LoaderSpinner = ({ loading }: { loading: boolean }) => {
  return (
    <div className={styles.loader}>
      <MoonLoader color="#2f82ff" loading={loading} />
    </div>
  )
}

export default LoaderSpinner

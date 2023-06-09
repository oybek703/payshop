import '../styles/globals.scss'
import { Inter } from 'next/font/google'
import React from 'react'
import styles from '@/app/home.module.scss'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ReduxStateProvider } from '@/redux/Provider'
import { ICountry } from '@/interfaces/ip-detection.interfaces'
import NextAuthProvider from '@/components/NextAuthProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/lib/autOptions'

const inter = Inter({ subsets: ['latin'], weight: '500' })

export const metadata = {
  title: 'PayShop - online store',
  description: 'The most comfortable e-shop...'
}

const getIpLocation = async (): Promise<ICountry | undefined> => {
  // TODO Enable on production
  // const res = await fetch(`https://api.ipregistry.co?key=${process.env.IPREGISTRY_KEY}`)
  // if (res.ok) {
  //   const data = await res.json()
  //   return {
  //     name: data.location.country.name,
  //     currency: data.currency.code,
  //     flag: data.location.country.flag.emojitwo
  //   }
  // }
  return {
    name: 'Uzbekistan',
    currency: 'uzs',
    flag: '/images/flag.png'
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const country = await getIpLocation()
  const session = await getServerSession(authOptions as any)
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <NextAuthProvider>
          <ReduxStateProvider>
            <Header session={session} country={country} />
            <div className={styles.home}>
              <div className="container">{children}</div>
            </div>
            <Footer />
          </ReduxStateProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}

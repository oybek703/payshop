import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import Head from 'next/head'

const persistor = persistStore(store)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>PayShop </title>
        <meta name="description" content="PayShop - find what you need!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <Component {...pageProps} />
        </PersistGate>
      </Provider>
    </>
  )
}

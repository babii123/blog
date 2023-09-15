// import 'antd/dist/antd.css'
import NiceModal from '@ebay/nice-modal-react'
import '../styles/global.scss'
import Head from 'next/head'
// import 'bytemd/dist/index.css'
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/static/logo.ico" />
      </Head>
      <NiceModal.Provider>
        <Component {...pageProps} />
      </NiceModal.Provider>
    </>
  )
}

export default MyApp

// import 'antd/dist/antd.css'
import NiceModal from '@ebay/nice-modal-react'
import '../styles/global.scss'
// import 'bytemd/dist/index.css'
function MyApp({ Component, pageProps }) {
  return (
    <NiceModal.Provider>
      <Component {...pageProps} />
    </NiceModal.Provider>
  )
}

export default MyApp

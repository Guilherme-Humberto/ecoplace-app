import Footer from '@components/molecules/Footer'
import Header from '@components/molecules/Header'

import type { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { GlobalStyles } from '../styles/global'
import { theme } from '../../themes/primary'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {/* <Header /> */}
      <Component {...pageProps} />
      <Footer />
    </ThemeProvider>
  )
}
export default MyApp

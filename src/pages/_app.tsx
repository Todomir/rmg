import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>RMG</title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>
  )
}

import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { QueryClient, QueryClientProvider } from 'react-query'

import { AnimateSharedLayout } from 'framer-motion'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AnimateSharedLayout type="crossfade">
      <Head>
        <title>RMG | Random Meal Generator</title>
      </Head>

      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </AnimateSharedLayout>
  )
}

// pages/_app.tsx
import type { AppProps } from 'next/app';
import Layout from '@/components/Layout'; // Укажите правильный путь
import '../global.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout meta={pageProps.meta}>
      <Component {...pageProps} />
    </Layout>
  );
}
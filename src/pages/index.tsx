import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import { Dashboard } from './dashboard'
import Login from './login'

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Head>
        <title>Running Man</title>
      </Head>

      {
        session ? (
          <Dashboard />
        ) : (
          <Login />
        )
      }
    </div >
  )
}

export default Home

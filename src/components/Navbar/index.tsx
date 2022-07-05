import { signOut } from 'next-auth/react';
import Link from 'next/link';

interface ActiveLink {
  active?: 'notes' | 'graphics';
}

export function Navbar({ active }: ActiveLink) {
  return (
    <nav className='bg-gradient-to-l from-blue-500 to-orange-500 h-16 flex justify-between py-2 px-6 z-10'>
      <Link className='flex items-center py-1 h-full cursor-pointer' href="/">
        <img src="/logo.png" className='cursor-pointer' alt="Imagem de uma pessoa correndo" />
      </Link>
      <div className='flex items-center mr-1'>
        <Link href="/notes">
          <h1
            className={`text-zinc-200 text-lg mt-2 cursor-pointer mr-4 sm:mr-10 hover:text-zinc-100 hover:underline
                      ${active === 'notes' && 'text-zinc-100 bg-zinc-100 bg-opacity-20 px-6 py-2 rounded'} `}
          >
            Notas
          </h1>
        </Link>
        <Link href="/graphics">
          <h1
            className={`text-zinc-200 mt-2 text-lg cursor-pointer hover:text-zinc-100 hover:underline
                      ${active === 'graphics' && 'text-zinc-100 bg-zinc-100 bg-opacity-20 px-6 py-2 rounded'} `}
          >
            Gráficos
          </h1>
        </Link>
        <button
          className='text-zinc-200 px-10 py-1 brightness-110 bg-orange-500 tracking-wide uppercase rounded text-lg ml-4 sm:ml-10'
          onClick={() => signOut()}
        >
          Sair
        </button>
      </div>
    </nav>
  )
}
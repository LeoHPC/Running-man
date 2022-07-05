import { useSession } from 'next-auth/react';

import { Navbar } from '../../components/Navbar';

export function Dashboard() {
  const { data: session } = useSession();

  return (
    <>
      <Navbar />
      <main className="bg-blur bg-cover bg-no-repeat h-[calc(100vh-56px)] sm:h-[calc(100vh-56px)] md:h-[calc(100vh-60px)] lg:h-[calc(100vh-64px)] flex flex-col justify-center items-center">
        <div className='overflow-hidden w-20 h-20 rounded-full border-2 mb-2 border-orange-500'>
          <img
            className='hover:scale-110 transition-all'
            src={session?.user?.image ? session.user.image : ''}
            alt={session?.user?.name ? session.user.name : 'Foto do usuário'}
            referrerPolicy="no-referrer"
          />
        </div>
        <h1 className='text-3xl mt-2 text-zinc-200 font-bold'>
          Olá, {session?.user?.name}!
        </h1>
        <p className='text-xl mt-[-10px] text-zinc-200 italic text-center'>
          Clique em um dos botões do menu acima para começar!
        </p>
      </main>
    </>
  )
}
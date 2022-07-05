import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className='min-h-screen w-screen flex'>
      <div className='w-0 sm:w-4/12 md:w-5/12 lg:w-3/5 flex flex-col items-start justify-center bg-gradient-to-tr from-blue-500 to-orange-500'>
        <div className='w-full items-center pl-[10%] md:pl-[5%] justify-start relative'>
          <img
            className='max-w-xs h-60 hidden sm:flex'
            src='/illustration.svg'
            alt="Imagem de uma pessoa correndo"
          />
        </div>
        <div className='pl-[10%] md:pl-[5%] mt-16'>
          <h2 className='text-2xl text-zinc-200 tracking-wide font-bold'>
            Acompanhe seus dados preferidos!
          </h2>
          <h3 className='text-xl mt-[-10px] text-zinc-200 italic'>Onde e quando quiser!</h3>
        </div>
      </div>

      <div className='w-full bg-gradient-to-tr from-blue-500 to-orange-500 sm:bg-gradient-to-tr sm:from-zinc-200 sm:to-zinc-300 sm:w-8/12 md:w-7/12 lg:w-2/5  flex flex-col items-center justify-center'>
        <img src="/logo.png" className='h-20' alt="Imagem de uma pessoa correndo" />
        <div className='flex mt-5 mb-[-6px] items-center'>
          <div className='h-[1px] bg-zinc-100 sm:bg-zinc-400 mb-3 sm:mb-2 w-10 mr-2 hover:w-10 transition-all'></div>
          <p className='text-zinc-100 sm:text-zinc-400 text-sm'>Faça login para começar</p>
          <div className='h-[1px] bg-zinc-100 sm:bg-zinc-400 mb-3 sm:mb-2 w-10 ml-2 hover:w-10 transition-all'></div>
        </div>
        <button
          className='flex px-8 items-center h-11 rounded brightness-110 bg-orange-500 hover:px-10 transition-all'
          onClick={() => signIn('google')}
        >
          <img className='mr-6' src="/google.svg" alt="Logo da Google" />
          <h1 className='text-zinc-200 pt-2 text-lg'>Entrar com o Google</h1>
        </button>
      </div>
    </div>
  )
}
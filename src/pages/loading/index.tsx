import { CircleNotch } from "phosphor-react";

export default function Loading() {
  return (
    <main className="bg-blur bg-cover bg-no-repeat w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <CircleNotch size={48} className="text-zinc-200 animate-spin" />
        <h1 className="text-zinc-200 font-bold text-3xl mt-3">
          Carregando...
        </h1>
      </div>
    </main>
  )
}
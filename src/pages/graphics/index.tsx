import { format, parseISO, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import { GetStaticProps } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { CustomTooltip } from "../../components/CustomTooltip";
import { Navbar } from "../../components/Navbar";
import { data, GraphicData } from "../../constants/graphicData01";
import Loading from "../loading";

export default function Graphics(props: string[]) {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.push('/')
      }
    }
  }, [session, loading]);

  if (loading) {
    return <Loading />
  }

  const data02 = [];
  for (let num = 30; num >= 0; num--) {
    data02.push({
      date: subDays(new Date(), num).toISOString().substring(0, 10),
      value: 1 + Math.random()
    })
  }

  return (
    <>
      <Head>
        <title>Running Man | Gráficos</title>
      </Head>

      <Navbar active='graphics' />
      <main className="bg-blur bg-cover bg-no-repeat min-h-[calc(100vh-64px)] pb-16 w-full 
                        overflow-x-hidden items-center justify-items-center">

        <section className="grid grid-cols-1 lg:grid-cols-2 pt-2 items-center justify-items-center">
          <div className="h-80 sm:h-[420px] lg:h-80 w-full max-w-[95vw] mr-1 sm:mr-10 lg:mr-0 ml-0 sm:ml-[4vw] lg:ml-0 lg:max-w-[45vw] mb-4 lg:mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                layout="horizontal"
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#FFF" />
                <XAxis dataKey="name" stroke="#FFF" type="category" />
                <YAxis type="number" stroke="#FFF" />
                <Tooltip />
                <Legend stroke="#FFF" />
                <Line dataKey="pv" stroke="#e61bdb" />
                <Line dataKey="uv" stroke="#f0ec10" />
              </LineChart>
            </ResponsiveContainer>
            <h2 className="text-xl text-red-500 font-bold text-center">{Object.values(props)}</h2>
          </div>

          <div className="h-80 sm:h-[420px] lg:h-80 lg:mt-0 w-full max-w-[95vw] mr-1 sm:mr-10 lg:mr-0 ml-0 sm:ml-[4vw] mt-16 sm:mt-10 md:mt-6 lg:ml-0 lg:max-w-[45vw] text-center mb-4 lg:mb-8">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#FFF" />
                <YAxis stroke="#FFF" />
                <Tooltip />
                <Legend stroke="#FFF" />
                <Bar dataKey="pv" stackId="a" fill="#505fdd" />
                <Bar dataKey="uv" stackId="a" fill="#1ddddd" />
              </BarChart>
            </ResponsiveContainer>
            <h2 className="text-xl text-red-500 font-bold text-center">{Object.values(props)}</h2>
          </div>

          <div className="h-80 sm:h-[420px] lg:h-80 mt-16 w-full max-w-[95vw] mr-1 sm:mr-10 lg:mr-0 ml-0 sm:ml-[4vw] sm:mt-10 md:mt-6 lg:ml-0 lg:max-w-[45vw] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="name" scale="band" stroke="#FFF" />
                <YAxis stroke="#FFF" />
                <Tooltip />
                <Legend stroke="#FFF" />
                <Bar dataKey="uv" barSize={20} fill="#22d5e2" />
                <Line type="monotone" dataKey="uv" stroke="#ff7300" />
              </ComposedChart>
            </ResponsiveContainer>
            <h2 className="text-xl text-red-500 font-bold text-center">{Object.values(props)}</h2>
          </div>

          <div className="h-80 sm:h-[420px] lg:h-80 mt-16 w-full max-w-[95vw] mr-1 sm:mr-10 lg:mr-0 ml-0 sm:ml-[4vw] sm:mt-10 md:mt-6 lg:ml-0 lg:max-w-[45vw] mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                layout="vertical"
                width={500}
                height={400}
                data={data}
                margin={{
                  top: 20,
                  right: 20,
                  bottom: 20,
                  left: 20,
                }}
              >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis type="number" stroke="#FFF" tickFormatter={(number) => {
                  if (number > 1000) {
                    const item = number / 1000
                    return `${item}k`
                  }
                  return number
                }} />
                <YAxis dataKey="name" type="category" scale="band" stroke="#FFF" />
                <Tooltip />
                <Legend stroke="#FFF" />
                <Area dataKey="amt" fill="#9493a8" stroke="#dbdae6" />
                <Bar dataKey="pv" barSize={20} fill="#19e273" />
                <Line dataKey="uv" stroke="#6bbcf1" />
              </ComposedChart>
            </ResponsiveContainer>
            <h2 className="text-xl text-red-500 font-bold text-center">{Object.values(props)}</h2>
          </div>
        </section>

        <section className="mt-16 mr-4">
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={data02}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
                  <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
                </linearGradient>
              </defs>

              <Area dataKey="value" stroke="#2451B7" fill="url(#color)" />
              <XAxis dataKey="date" axisLine={false} stroke="#FFF" tickLine={false} tickFormatter={(str: string) => {
                const date = parseISO(str);
                if (date.getDate() % 7 === 0) {
                  return format(date, "d' de ' MMM", { locale: ptBR })
                }
                return "";
              }} />
              <YAxis dataKey="value" stroke="#FFF" axisLine={false} tickLine={false} tickCount={8} tickFormatter={number => `$${number.toFixed(2)}`} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid opacity={0.1} vertical={false} />
            </AreaChart>
          </ResponsiveContainer>
        </section>

      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const warnings: string[] = [];

  data.forEach((item: GraphicData) => {
    if (item.pv > 4500) {
      warnings.push(`O item ${item.name} ultrapassou a marca de 4500 PV! `)
    }
  })

  return {
    props: { warnings },
    revalidate: 60 * 60 * 24 // One day
  }
}
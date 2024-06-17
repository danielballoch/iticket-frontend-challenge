import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Event from "../components/event"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function Page(){
  const { data, error } = useSWR('https://technical-test-api.azurewebsites.net/events', fetcher)
  console.log(data)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  

  return (
    <>
    <div className="flex min-h-screen flex-col justify-center py-2">
      <Head>
        <title>Events | iTICKET Frontend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col  px-20 text-center">
        <div className="flex w-11/12 justify-between text-xl mt-5 px-5">
          <a href="/"><h1>iTicket Frontend Coding Challenge</h1></a>
          <a href="/cart"><Image src="/cart.png" width={35} height={35}/></a>
        </div>
        <div className="flex flex-wrap w-11/12 justify-between mt-52">
          {data.map((e: any, i) =><a className="w-6/12" href={"/events/"+(i+1)}><Event title={e.name} imageUrl={e.imageUrl}/></a>)}
          <Event title="Placeholder Event" imageUrl=""/>
          <Event title="Placeholder Event" imageUrl=""/>
          <Event title="Placeholder Event" imageUrl=""/>
          <Event title="Placeholder Event" imageUrl=""/>
        </div>
       </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          href="https://www.iticket.co.nz/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image src="/iTICKET.svg" alt="iTICKET Logo" width={32} height={32} />
        </a>
      </footer>
    </div>
    </>
  );
};



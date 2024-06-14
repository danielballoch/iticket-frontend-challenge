import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import CartSummary from "../components/cart-summary"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())


export default function Page(){
  const { data, error } = useSWR('https://technical-test-api.azurewebsites.net/events', fetcher)
  console.log(data)
  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>
  
  let seatsPlaceholder1 = [
    {"id": 0, "type":"Adult", "cost":"50","number":"2"}, 
    {"id": 1, "type":"Child", "cost":"30","number":"1"}
  ];

  let seatsPlaceholder2 = [
    {"id": 0, "type":"Adult", "cost":"50","number":"2"}, 
    {"id": 1, "type":"Child", "cost":"30","number":"1"},
    {"id": 3, "type":"Senior", "cost":"15","number":"1"}
  ];

  return (
    <>
    <div className="flex min-h-screen flex-col justify-center py-2">
      <Head>
        <title>Cart| iTICKET Frontend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col  px-20">
        <div className="flex w-11/12 justify-between text-xl mt-5 px-5">
          <a href="/"><h1>iTicket Frontend Coding Challenge</h1></a>
          <Image src="/cart.png" width={35} height={35}/>
        </div>
        <div className="w-11/12 mt-52">
          <h1 className="w-6/12 mb-10 text-4xl">iTICKET Shopping Cart</h1>
          <h2 className="w-6/12 mb-10 text-3xl">Summary:</h2>
          {data.map((e: any) =><CartSummary title={e.name} seats={seatsPlaceholder1}/>)}
          <CartSummary title="Placeholder Event" seats={seatsPlaceholder2}/>
          <h3>Total: $405</h3>
          <button className="border-2 py-2.5 px-40 my-4">Checkout</button>
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

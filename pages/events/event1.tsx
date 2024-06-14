import Head from "next/head";
import Image from "next/image";

export default function Page({event}) {
    console.log("eventssss:", event)
    console.log(event.imageUrl)
    return (
        <>
        <div className="flex min-h-screen flex-col justify-center py-2">
          <Head>
            <title>Events | iTICKET Frontend</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
    
          <main className="flex w-full flex-1 flex-col  px-20">
            <div className="flex w-11/12 justify-between text-xl mt-5 px-5">
              <a href="/"><h1>iTicket Frontend Coding Challenge</h1></a>
              <a href="/cart"><Image src="/cart.png" width={35} height={35}/></a>
            </div>
            <div className="w-11/12 mt-52 flex justify-center">
                <img src={event.imageUrl} width={350} height={350}/>
                <div className="ml-20 py-10">
                    <h1 className="text-3xl">{event.name}</h1>
                </div>
                
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
    )
  }

  export async function getStaticProps(){
    const results = await fetch('https://technical-test-api.azurewebsites.net/events').then(r => r.json());
    return {
        props: {
            event: results[0]
        }
    }
  }

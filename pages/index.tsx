import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Event from "../components/event"


const Home: NextPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-center py-2">
      <Head>
        <title>Events | iTICKET Frontend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col  px-20 text-center">
        <div className="flex w-11/12 justify-between text-xl mt-5 px-5">
          <h1>iTicket Frontend Coding Challenge</h1>
          <div>Cart Icon</div>
        </div>
        <div className="flex flex-wrap w-11/12 justify-between mt-52">
          <Event title="project title 1"/>
          <Event title="project title 2"/>
          <Event title="placeholder event"/>
          <Event title="placeholder event"/>
          <Event title="placeholder event"/>
          <Event title="placeholder event"/>
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
  );
};

export default Home;

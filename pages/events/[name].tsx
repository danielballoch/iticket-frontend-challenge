import Head from "next/head";
import { useState, useEffect } from "react";
import Image from "next/image";


export default function Page({event}) {
    // const [rows, updateRows] = useState()
    const [selected, setSelected] = useState([])
    const [price, setPrice] = useState(0);
    console.log("event data:", event)
    // console.log("ticket test", event[0].allocatedSeatIds)
    let tickets = []
    let rows = [[]]
    if(event[0].type === "allocated"){
      event[0].allocatedSeatIds.forEach(element => {
        let obj = event[2].find(o => o.id === element)
        //do row sort here
        tickets.push(obj)
      });
    }
    for (let i = 0; i < tickets.length; i++){
      if (i != tickets.length - 1 && tickets[i].seatRow != tickets[i + 1].seatRow){
        rows.push([])
      }
    }
    let row = 0;
    for (let i = 0; i < tickets.length; i++){
      // console.log("i:", i)
      if(i === 0 || tickets[i].seatRow === tickets[i - 1].seatRow){
        rows[row].push(tickets[i]);
      } else {
        row += 1;
        // console.log(row)
        rows[row].push(tickets[i]);
      }
    }
    console.log("tickets", tickets)
    // console.log("rows:", rows)
    // console.log(row)

    useEffect(()=> {
      console.log("selected seats: ", selected)
      let seatPrice = 0;
      for(let i = 0; i < selected.length; i++){
        console.log(selected[i])
      }
    },[selected])

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
                <img src={event[0].imageUrl} width={350} height={350}/>
                <div className="ml-20 py-10">
                    <h1 className="text-3xl">{event[0].name}</h1>
                    <h2>Please select your {event[0].type === "allocated" ? "seats(s)" : "tickets(s)"} - limit {event[0].bookingLimit} per customer.</h2>
                    <div className="my-10">
                    {event[0].type === "allocated" ? 
                    <div className="flex flex-col">
                      <div className="bg-stone-600 w-full h-5 mb-0"/>
                      {rows.map((row, i) => (
                        <div className="flex">
                          {/* <div className="flex justify-center items-center w-20">row {i}:</div> */}
                          {row.map((seat) => (
                            <div 
                            onClick={() => {
                              if(selected.includes(seat.id)){
                                var currentSelected = [...selected];
                                var index = currentSelected.indexOf(seat.id); 
                                if(index !== -1){
                                  currentSelected.splice(index, 1); 
                                  setSelected(currentSelected);
                                }
                              }
                              else{setSelected(selected => [...selected, seat.id])}}
                            }
                            className={selected.includes(seat.id)? "flex justify-center items-center w-14 h-14 bg-green-600 hover:cursor-pointer text-white" : seat.status === 0? "flex justify-center items-center w-14 h-14 bg-stone-300 hover:bg-green-600 hover:cursor-pointer hover:text-white" : "flex justify-center items-center w-14 h-14 bg-stone-500"}>{seat.seatRow}{seat.seatColumn}</div>
                          ))}
                        </div>
                      ))}
                      {/* {tickets.map((ticket, i) => (
                        <div className="flex"><div className="p-2 bg-green-600" key={ticket.id}>{ticket.seatRow}{ticket.seatColumn}</div> {i != tickets.length - 1 && ticket.seatRow != tickets[i + 1].seatRow? <div className="basis-full">break</div> : "" }</div>
                      ))} */}
                    </div>
                    : 
                    "seat(s)"}
                    </div>
                    <p>Total Price: ${price}</p>
                    <button className="border-2 py-2.5 px-40 my-4">Add to Cart</button>
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

  export async function getStaticProps({params}){
    let eventId = parseInt(params.name);
    const eventData = await fetch(`https://technical-test-api.azurewebsites.net/events/${eventId}`).then(r => r.json())
    const prices = await fetch(`https://technical-test-api.azurewebsites.net/prices`).then(r => r.json())
    const allocated = await fetch(`https://technical-test-api.azurewebsites.net/allocated-seats`).then(r => r.json())
    const ga = await fetch(`https://technical-test-api.azurewebsites.net/ga-areas`).then(r => r.json())

    let pageData = [eventData, prices, allocated, ga]
    console.log("params: ",params)
    return {
        props: {
            event: pageData
        }
    }
  }

  export async function getStaticPaths(){
    const data = await fetch('https://technical-test-api.azurewebsites.net/events').then(r => r.json());
    console.log("data:", data);
    let n = data[0].id.toString()
    console.log("hello", n)
    return {
        paths: data.map(d => {
            return {
                params: {
                    name: d.id.toString()
                }
            }
        }),
        fallback: false
    }
  }
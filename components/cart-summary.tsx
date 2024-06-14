import React from 'react';

interface EventProps {
  title: string,
  seats: Array<string>,
}

const Event: React.FC<EventProps> = ({ title, seats }) => {
    console.log("seats: ", seats.length)
    let cost = 0;
    for (let i = 0; i < seats.length; i++){cost += seats[i].number * seats[i].cost}
    console.log("cost: ", cost)
  return (
            <div className="w-6/12 px-3 mb-10">
              <h3 className="text-left text-xl">{title}</h3>
              <p className='mb-5'>Seats Selected:</p>
              {seats.map((seat: any) =>
              <div className="w-8/12 flex justify-between">
                <span>{seat.type}</span>
                <span>${seat.cost}</span>
                <span><button className="border-2 px-1.5 m-1">+</button>{seat.number}<button className="border-2 px-1.5 m-1">-</button></span>
              </div>
              )}
              <p className='mt-5'>Tickets Selected:  {seats.map((seat: any, i) =><span>{seat.number} x {seat.type}{i+1 < seats.length? ", " : ""}</span>)}</p>
              <p>Cost: ${cost}</p>
              <hr className='my-5'/>
            </div>
          )
};

export default Event;
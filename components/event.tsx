import React from 'react';

interface EventProps {
  title: string,
  imageUrl: string;
}

const Event: React.FC<EventProps> = ({ title, imageUrl }) => {
  return (
            <div className="w-6/12 px-3 mb-10">
              <img className="w-full h-80 bg-current" src={imageUrl}/>
              <p className="text-left">{title}</p>
            </div>
          )
};

export default Event;
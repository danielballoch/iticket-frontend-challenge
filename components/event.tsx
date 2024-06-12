// Button.tsx
import React from 'react';

interface ButtonProps {
  title: string;
}

const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
            <a className="w-6/12 px-3 mb-10">
              <div className="w-full h-80 bg-current">image</div>
              <p className="text-left">{title}</p>
            </a>
          )
};

export default Button;
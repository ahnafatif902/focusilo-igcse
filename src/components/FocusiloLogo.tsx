import React from 'react';

interface LogoProps {
  className?: string;
}

export const FocusiloLogo: React.FC<LogoProps> = ({ className = "w-8 h-8" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background shadow for neo-brutalism effect */}
      <path 
        d="M15 15 L85 15 L85 35 L45 35 L45 55 L75 55 L75 75 L45 75 L45 95 L15 95 Z" 
        className="fill-white"
        transform="translate(4, 4)"
      />
      
      {/* Main F shape */}
      <path 
        d="M15 15 L85 15 L85 35 L45 35 L45 55 L75 55 L75 75 L45 75 L45 95 L15 95 Z" 
        className="fill-black stroke-white"
        strokeWidth="4"
        strokeLinejoin="miter"
      />

      {/* Prism geometric lines */}
      <path 
        d="M15 15 L45 35" 
        className="stroke-accent-green"
        strokeWidth="4"
      />
      <path 
        d="M45 55 L75 75" 
        className="stroke-accent-blue"
        strokeWidth="4"
      />
      <path 
        d="M15 55 L45 55" 
        className="stroke-white/40"
        strokeWidth="2"
      />
      <path 
        d="M15 75 L45 75" 
        className="stroke-white/40"
        strokeWidth="2"
      />
    </svg>
  );
};

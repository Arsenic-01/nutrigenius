import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`bg-white border border-slate-200 rounded-xl transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "", ...props }) => {
  return (
    <div
      {...props}
      className={`bg-white border border-slate-200 rounded-xl transition-all duration-300 ease-in-out hover:transform hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;

import React from "react";
import { Navbar } from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-0">
        <Navbar />
      </div>
      <main className="flex flex-1 items-center justify-center bg-gray-300">
        {children}
      </main>
    </div>
  );
};

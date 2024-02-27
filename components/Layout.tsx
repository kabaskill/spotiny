import { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      
      <header className="bg-slate-900 flex py-2 px-4 justify-start ">
        <h1>SpoLite</h1>
      </header>
      
      <div className="page-wrapper">
        <Navbar />
        {children}

      </div>

    </>
  );
}

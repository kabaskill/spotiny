import { ReactNode } from "react";
import Login from "@/components/Login";
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  function handleClick(string: string) {
    console.log(string);
  }

  return (
    <>
      <header className="flex justify-between px-4 py-4">
        <h1>SpoLite</h1>
        <Login />
      </header>

      <nav>
        <ul className="flex justify-around">
          <li>
            <button onClick={() => handleClick("B1")} className="bg-gray-500" type="button">
              Button 1
            </button>
          </li>

          <li>
            <button onClick={() => handleClick("B2")} className="bg-gray-500" type="button">
              Button 2
            </button>
          </li>

          <li>
            <button onClick={() => handleClick("B3")} className="bg-gray-500" type="button">
              Button 3
            </button>
          </li>
        </ul>
      </nav>
      {children}
    </>
  );
}

import Login from "@/components/Login";

function handleClick(string: string) {
  console.log(string);
}

export default function Navbar() {
  return (
    <nav className="h-full flex flex-col justify-between">
      <ul className="flex flex-col justify-around">
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
      <Login />
    </nav>
  );
}

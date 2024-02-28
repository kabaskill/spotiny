import Login from "@/components/Login";

function handleClick(string: string) {
  console.log(string);
}

export default function LeftPane() {
  return (
    <nav className="bg-background sticky top-0 left-0 min-w-full flex flex-col justify-between py-8">
      <header className=" flex justify-center ">
        <h1>spAMPify</h1>
      </header>
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

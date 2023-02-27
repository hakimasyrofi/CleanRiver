import React, { useState } from "react";
import Logo from "../logo.png";

const Navigation = (props) => {
  const [menu, setMenu] = useState(false);

  return (

<nav class="p-2 border-gray-200 rounded bg-white green:bg-gray-800 green:border-gray-700">
  <div class="container flex flex-wrap items-center justify-between mx-auto">
    <a class="flex items-center">
        <img src={Logo} class="h-10 mr-3 sm:h-14" alt="Flowbite Logo" />
    </a>
    <button onClick={() => setMenu(!menu)} data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 green:text-gray-400 green:hover:bg-gray-700 green:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class={"w-full md:block md:w-auto " + (menu? "":"hidden")} id="navbar-solid-bg">
      {props.isConnected && (
      <ul class="flex flex-col mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-transparent">
        <li>
          <a class="font-sora text-xl block py-2 pl-3 pr-4 text-gray-700 rounded md:bg-transparent md:text-gray-700 md:p-0 md:green:text-gray-700 green:bg-white md:green:bg-transparent" aria-current="page">
          {props.address}
            </a>
        </li>
        <li>
          <a class="font-sora text-xl block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 green:text-gray-400 md:green:hover:text-white green:hover:bg-gray-700 green:hover:text-white md:green:hover:bg-transparent">
          {props.userBal ? parseFloat(props.userBal).toFixed(4)+" MATIC" : "Loading ..." }
            </a>
        </li>
      </ul>)}
    </div>
    <div class={"w-full md:block md:w-auto "+ (menu? "":"hidden")}>
    {!props.isConnected?
    <button type="button" onClick={props.connect} class="text-white bg-green hover:ease-in duration-150 hover:scale-90 hover:ring-2 hover:ring-offset-4 hover:ring-green font-sora rounded-full text-lg px-9 py-2.5 text-center mr-3 md:mr-0">Connect Wallet</button>
    :<button type="button" onClick={props.clicked}  class="text-white bg-green hover:ease-in duration-150 hover:scale-90 hover:ring-2 hover:ring-offset-4 hover:ring-green font-sora rounded-full text-lg px-9 py-2.5 text-center mr-3 md:mr-0">Disconnect Wallet</button>
    }
    </div>
  </div>
  </nav>
  );
};

export default Navigation;

import React, { useState } from "react";

const Header = (props) => {

  return (
<div class="w-full bg-cover bg-center h-96 bg-hero-pattern">
        <div class="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div class="text-center">
                <h1 class="text-white mb-10 text-2xl font-bold uppercase md:text-3xl">Help us fund more river and illegal landfill cleanups today.</h1>
                {!props.isConnected &&
                  <button class="mt-4 px-4 py-2 bg-green text-white text-sm uppercase font-medium rounded hover:bg-green focus:outline-none focus:bg-green">Donate Now!</button>
}
        {props.isConnected &&
              <div class="bg-white p-4 m-6 rounded-lg shadow-lg opacity-90">
              <div class="flex flex-row mb-8">
              <div class="flex-auto w-32">
                    <p className="text-2xl font-bold">Fundraiser</p>
                    <p className="text-xl font-semibold">{props.donationInfo[2]}</p>
                  </div>
              </div>
                <div class="flex flex-row">
                
                  <div class="flex-auto w-32">
                  <p className="text-2xl font-bold">Total Donation</p>
                  <p className="text-xl font-semibold">{(props.donationInfo[0]/1E18).toFixed(4)} MATIC</p>
                  </div>
                  <div class="flex-auto w-32">
                    <p className="text-2xl font-bold">Number of Donation</p>
                    <p className="text-xl font-semibold">{props.donationInfo[1]}</p>
                  </div>
                </div>
              </div> }
              </div>
        </div>
    </div>
  );
};

export default Header;

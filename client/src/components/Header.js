import React, { useState } from "react";

const Header = (props) => {

  return (
<div className="w-full bg-cover bg-center h-96 bg-hero-pattern">
        <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
            <div className="text-center">
                <h1 className="text-white mb-10 text-2xl font-bold uppercase md:text-3xl">Help us fund more river and illegal landfill cleanups today.</h1>
                {!props.isConnected &&
                  <button onClick={props.connect} className="h-12 w-1/4 text-xl mt-8 bg-green cursor-pointer text-white rounded-full hover:bg-green-900 hover:scale-95">Donate Now!</button>
}
        {props.isConnected &&
              <div className="bg-white p-4 m-6 rounded-lg shadow-lg opacity-90">
              <div className="flex flex-row mb-8">
              <div className="flex-auto w-32">
                    <p className="text-2xl font-bold">Fundraiser</p>
                    <p className="text-xl font-semibold">{props.donationInfo[2]}</p>
                  </div>
              </div>
                <div className="flex flex-row">
                
                  <div className="flex-auto w-32">
                  <p className="text-2xl font-bold">Total Donation</p>
                  <p className="text-xl font-semibold">{(props.donationInfo[0]/1E18).toFixed(4)} MATIC</p>
                  </div>
                  <div className="flex-auto w-32">
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

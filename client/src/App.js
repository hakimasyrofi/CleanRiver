import './App.css';
import {
  useConnect, useDisconnect, useAccount, usePrepareContractWrite, useContractWrite,
} from 'wagmi';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { utils } from 'ethers';
import useDebounce from './useDebounce';

import ABI from './Donation.json';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Modal from './components/Modal';
import profileImage from './profile.png';

function App() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
  });
  const { disconnect } = useDisconnect()
  const [userBal, setUserBal] = useState(null);
  const [donationCount, setDonationCount] = useState(null);
  const [totalDonation, setTotalDonation] = useState(null);
  const [owner, setOwner] = useState(null);
  const [transactionData, setTransactionData] = useState([])
  const [sendAmount, setSendAmount] = useState(0.01);
  const debouncedSendAmount = useDebounce(sendAmount, 500);
  const [modalOn, setModalOn] = useState(false);
  const domain = 'https://tes.ambizeducation.com'; // http://localhost:3000

  const clicked = () => {
    setModalOn(true);
  };

  const { config: config_send } = usePrepareContractWrite({
    address: '0xbF01C7dccAf17b325F258CabE92e0D99910EE406',
    abi: ABI.abi,
    chainId: 80001,
    functionName: 'sendDonation',
    overrides: {
      from: address,
      value: utils.parseEther(debouncedSendAmount.toString()),
    },
  });

  const { write: transfer2 } = useContractWrite(config_send);

  function changeSendAmount(e) {
    setSendAmount(e.target.value);
  }

  async function getBalance() {
    const response = await axios.get(domain + '/express_api_moralis/getMaticBalance', {
      params: {
        address: address,
      },
    });

    setUserBal(response.data.balance);
  }

  async function donationInfo(funcName) {
    const response = await axios.get(domain + '/express_api_moralis/getDonationInfo', {
      params: {
        name: funcName,
      },
    });
    if (funcName === 'donationCount') {
      setDonationCount(response.data.info);
      transactionInfo(response.data.info);
    }
    else if (funcName === 'totalDonation') {
      setTotalDonation(response.data.info);
    }
    else if (funcName === 'owner') {
      setOwner(response.data.info);
    }
  }

  // Get 5 latest transaction
  async function transactionInfo(count) {
    const len = count;
    let array = [];
    if (len < 5 && len > 0) {
      for (let i = 0; i < len; i++) {
        const info = await axios.get(domain + '/express_api_moralis/getTransactionInfo', {
          params: {
            id: i,
          },
        });
        array.push([info.data.info.addr, info.data.info.amount, info.data.info.timestamp])
      }
      array = array.reverse();
      setTransactionData(array);
    } else if (len >= 5) {
      for (let i = len - 5; i < len; i++) {
        const info = await axios.get(domain + '/express_api_moralis/getTransactionInfo', {
          params: {
            id: i,
          },
        });
        array.push([info.data.info.addr, info.data.info.amount]);
      }
      array = array.reverse();
      setTransactionData(array);
    }
  }

  useEffect(() => {
    if (!isConnected) {
      setUserBal(null);
      setSendAmount(0.01);
      return;
    }
    Promise.all([
      getBalance(),
      donationInfo('donationCount'),
      donationInfo('totalDonation'),
      donationInfo('owner'),
    ])
    transactionInfo();
  }, [isConnected, address]);

  return (
    <div className="App text-center">
      <Navigation isConnected={isConnected} connect={connect} clicked={clicked} address={address} userBal={userBal}/>
      <Header isConnected={isConnected} donationInfo={[totalDonation, donationCount, owner]}/>
      {modalOn && <Modal setModalOn={setModalOn} disconnect={disconnect}/>}
      {isConnected &&
        <>
          <label class="block mt-4 mb-2 text-xl font-medium text-gray-900 dark:text-white">Donation Amount</label>
          <input type="number" className="w-1/2 lg:w-1/3 px-4 bg-gray-50 font-medium rounded-lg border border-gray-300" value={sendAmount} onChange={changeSendAmount} placeholder="Enter amount" />
          <br/>

          <button className="h-12 w-1/4 text-xl mt-8 bg-green cursor-pointer text-white rounded-full" /*disabled={!transfer2}*/ onClick={()=>transfer2?.()}>Donate</button>

      <p className="text-2xl font-bold pt-10">Latest Donation</p>
      {transactionData.map((transaction) => {
        return (
        <div class="bg-white p-6 m-6 sm:mx-20 sm:my-6 lg:mx-40 lg:my-6 rounded-lg shadow-lg">
          <div class="flex flex-row items-center">
            <div class="flex-initial w-12 pr-4">
              <img className="w-12" alt="" src={profileImage}></img>
            </div>
            <div class="flex-auto w-32">
              <p className="text-xl">{transaction[0]}</p>
            </div>
            <div class="flex-auto w-16">
              <p className="text-xl font-semibold">{transaction[1]/1E18} MATIC</p>
            </div>
            <div class="flex-auto w-16">
              <p className="text-xl font-semibold">{transaction[2]}</p>
            </div>
          </div>
        </div>
        );
      })}
      </>
      }
    </div>
  );
}

export default App;

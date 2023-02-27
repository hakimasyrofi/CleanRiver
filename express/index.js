const express = require('express');
const cors = require('cors');
const Moralis = require('moralis').default;
require('dotenv').config();
const ABI = require('./Donation.json');

const app = express();
const port = 3000;
const contractAddress = '0xbF01C7dccAf17b325F258CabE92e0D99910EE406';

app.use(cors());

app.get('/express_api_moralis/getMaticBalance', async (req, res) => {
  const { query } = req;

  const response = await Moralis.EvmApi.balance.getNativeBalance({
    address: query.address,
    chain: '80001',
  });

  const bal = response.toJSON().balance / 1E18;

  if (bal) {
    res.send({ balance: bal });
  } else {
    res.send({ balance: '0.00' });
  }
});

app.get('/express_api_moralis/getDonationInfo', async (req, res) => {
  const { query } = req;

  const abi = ABI.abi;
  const functionName = query.name;
  const address = contractAddress;
  const chain = '80001';

  const response = await Moralis.EvmApi.utils.runContractFunction({
    abi,
    functionName,
    address,
    chain,
  });

  const bal = response;

  if (bal) {
    res.send({ info: bal });
  } else {
    res.send({ info: '0.00' });
  }
});

app.get('/express_api_moralis/getTransactionInfo', async (req, res) => {
  const { query } = req;

  const abi = ABI.abi;
  const functionName = 'transactionHistory';
  const address = contractAddress;
  const chain = '80001';
  const params = {
    '': query.id,
  };

  const response = await Moralis.EvmApi.utils.runContractFunction({
    abi,
    functionName,
    address,
    chain,
    params,
  });

  const bal = {
    'addr': response.toJSON().addr,
    'amount': response.toJSON().amount,
    'timestamp': convertEpoch(response.toJSON().timestamp)
  };

  if (bal) {
    res.send({ info: bal });
  } else {
    res.send({ info: '0.00' });
  }
});

function convertEpoch(startTime) {
  const endTime = parseInt(Math.floor(Date.now()/1000));

  const diff = endTime - startTime;
  let value;

  function singularCheck(num, unit) {
    if (num === 1) {
      return (num + ' ' + unit + ' ago');
    }

    return (num + ' ' + unit + 's ago');
  }

  if (diff > 0 && diff < 60) {
    const totalSeconds = parseInt(Math.floor(diff));
    value = totalSeconds;
    return (singularCheck(value, 'second'));
  } else if (diff >= 60 && diff < 60 * 60) {
    const totalMinutes = parseInt(Math.floor(diff / 60));
    value = totalMinutes;
    return (singularCheck(value, "minute"));
  }
  else if (diff >= 60 * 60 && diff < 60 * 60 * 24) {
    const totalHours = parseInt(Math.floor(diff / (60 * 60)));
    value = totalHours;
    return (singularCheck(value, "hour"));
  }
  else if (diff >= 60 * 60 * 24 && diff < 60 * 60 * 24 * 7) {
    const totalDays = parseInt(Math.floor(diff / (60 * 60 * 24)));
    value = totalDays;
    return (singularCheck(value, "day"));
  }
  else if (diff >= 60 * 60 * 24 * 7) {
    const totalWeeks = parseInt(Math.floor(diff / (60 * 60 * 24 * 7)));
    value = totalWeeks;
    return (singularCheck(value, "week"));
  }
  console.log(value);
}

Moralis.start({
  apiKey: process.env.MORALIS_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log('Listening for reqs');
  });
});

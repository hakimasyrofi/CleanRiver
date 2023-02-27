const Donation = artifacts.require("Donation");

// testnet
module.exports = async (deployer) => {
  let donation = await deployer.deploy(Donation);
  console.log("Donation Smart Contract Address = '"+ Donation.address+"'");
  await donation.setAddrFundraiser("0xb3830BffE75efd030f7202be367A6324DB80d9A3");
};

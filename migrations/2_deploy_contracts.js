const Router = artifacts.require("ClassySwapRouter.sol");
const WETH = artifacts.require("WETH9.sol");
const Multicall = artifacts.require("Multicall.sol");

module.exports = async function (deployer, network) {
  let weth;
  const FACTORY_ADDRESS = "0xc4Dd20b44b015b1e7cE55e6c8475Bddf376943F2";

  if (network === "mainnet") {
    weth = await WETH.at("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
  } else {
    //ropsten
    // weth = await WETH.at("0xc778417E063141139Fce010982780140Aa0cD5Ab");

    // local
    await deployer.deploy(WETH);
    weth = await WETH.deployed();
  }

  await deployer.deploy(Router, FACTORY_ADDRESS, weth.address);

  await deployer.deploy(Multicall);
};

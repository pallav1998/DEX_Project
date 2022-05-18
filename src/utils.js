import { ethers } from "ethers";
import Dex from "./contract/Dex.json";
import ERC20Abi from "./contract/ERC20abi.json";
import detectEthereumProvider from "@metamask/detect-provider";
const DEX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const getWeb3 = () => {
  return new Promise(async (resolve, reject) => {
    let provider = await detectEthereumProvider();
    if (provider) {
      await provider.request({ method: "eth_requestAccounts" });
      try {
        const web3 = new ethers.providers.Web3Provider(window.ethereum);
        resolve(web3);
      } catch (error) {
        reject(error);
      }
    }
    reject("Install Metamask");
  });
};

const getContracts = async (web3) => {
  // const signer = web3.getSigner();
  // console.log(signer, "signer");
  // console.log(await signer.getAddress());

  const dex = new ethers.Contract(DEX_ADDRESS, Dex.abi, web3);
  return dex;
  // const tokens = await dex.getTokens();
  // const tokenContracts = tokens.reduce(
  //   (acc, token) => ({
  //     ...acc,
  //     [ethers.utils.parseBytes32String(token.ticker)]: new ethers.Contract(
  //       token.tokenAddress,
  //       ERC20Abi,
  //       signer
  //     ),
  //   }),
  //   {}
  // );
  // return { dex, ...tokenContracts };
};

export { getWeb3, getContracts };

/**
 * useContract react-hook.
 * use this to switch chain on metamask wallet.
 * @module useChain
 * @author subhakartikkireddy
 */

import { useState, useEffect } from "react";
import Web3 from "web3";

export const useContract = (CHAIN_URL, ABI_DATA, TOKEN_ADDRESS) => {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [web3ChainUrl, setChainUrl] = useState(CHAIN_URL);
  const [contractAbi, setContractAbi] = useState({
    abi: ABI_DATA,
    token_address: TOKEN_ADDRESS
  });

  useEffect(() => {
    // if(!isLoggedIn) return;
    async function connectWeb3() {
      try {
        const w3 = await new Web3(web3ChainUrl);
        setContract(new w3.eth.Contract(contractAbi.abi, contractAbi.token_address));
      } catch (err) {
        console.log(err);
      }
    }
    connectWeb3();
  }, [contractAbi,web3ChainUrl]);

  return {
    web3,
    contract,
    setContractAbi,
    setChainUrl
  };
};
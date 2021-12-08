/**
 * useContract react-hook.
 * use this to intialise contract that will auto flip between http provider & web3 provider.
 * @module useContract
 * @author subhakartikkireddy
 */

import { useState, useEffect } from "react";
import Web3 from "web3";

/**
  * Summary. (useContract)
  * Description. (initialise contract with setContractParams, pass abi, token_address, chain_id this contract lives on)
  * @param { string } PROVIDER_URL - rpc http node url
  * @return { Object } web3 - web3 provider, contract - contract with methods, setContractParams - initialise contract
  * get your rpc node url from here - https://chainid.network/chains.json
*/
export const useContract = (PROVIDER_URL) => {

  const [chainId, setChainId] = useState(null);
  const [contractParams, setContractParams] = useState({
    abi: null,
    token_address: "",
    chain_id: null
  });

  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {

    const toHex = (num) => {
      return "0x" + num.toString(16);
    };

    const fromHex = (hexString) => {
      return parseInt(hexString, 16);
    };

    /* connect to metamask provider when on right chain */
    const handleChainChanged = (_chainId) => {
      setChainId(fromHex(_chainId));
      if(fromHex(_chainId) === contractParams.chain_id){
        setWeb3(new Web3(window.ethereum));
      }
      else
        setWeb3(new Web3(PROVIDER_URL))
    };

    /* connect to metamask provider if metamask connects*/
    const handleConnect = (connectInfo) => {
      if(fromHex(window.ethereum.chainId) === contractParams.chain_id){
        setWeb3(new Web3(window.ethereum));
      }
      else
        setWeb3(new Web3(PROVIDER_URL))
    };

    /* connect to http provider if metamask disconnects*/
    const handleDisconnect = (error) => {
      setWeb3(new Web3(PROVIDER_URL));
    };

    window.ethereum?.on("connect", handleConnect);
    window.ethereum?.on("disconnect", handleDisconnect);
    window.ethereum?.on("chainChanged", handleChainChanged);

    setChainId(fromHex(window.ethereum?.chainId));
    if(window.ethereum?.isConnected())
      handleConnect();
    else 
      handleDisconnect();

    return () => {
      window.ethereum?.removeListener("connect", handleConnect);
      window.ethereum?.removeListener("disconnect", handleDisconnect);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [setWeb3, setChainId]);

  useEffect(() => {
    if(!web3) return;

    /* intitialise contract if already not initialised */
    if(!contract && contractParams.abi && contractParams.token_address) {
        setContract(new web3.eth.Contract(contractParams.abi, contractParams.token_address));
    }
    
    /* intitialise new contract if param changes OR 
      change provider to current if web3 changes */
    if(contractParams.token_address !== contract?._address){
      if(contractParams.abi && contractParams.token_address)
        setContract(new web3.eth.Contract(contractParams.abi, contractParams.token_address));
    }
    else {
      contract.setProvider(web3.givenProvider);
    }
  }, [web3, contract, contractParams]);

  return {
    web3,
    contract,
    setContractParams
  };
};
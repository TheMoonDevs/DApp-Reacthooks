/**
 * useChain react-hook.
 * use this to switch chain on metamask wallet.
 * @module useChain
 * @author subhakartikkireddy
 */

import { useState, useEffect } from "react";

/** USE CHAIN REACT HOOK */
export const useChain = () => {
  const [chainId, setChainId] = useState(null);

  useEffect(() => {
    const handleChainChanged = (_chainId) => {
      setChainId(fromHex(_chainId));
    };
    window.ethereum?.on("chainChanged", handleChainChanged);
    setChainId(fromHex(window.ethereum?.chainId));
    return () => {
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, []);

  /**
   * @param { object } chain - chain object to switch to.
   * get your chain from here - https://chainid.network/chains.json
   */
  const switchChain = (chain) => {
    const params = {
      chainId: toHex(chain.chainId), // A 0x-prefixed hexadecimal string
      chainName: chain.name,
      nativeCurrency: {
        name: chain.nativeCurrency.name,
        symbol: chain.nativeCurrency.symbol, // 2-6 characters long
        decimals: chain.nativeCurrency.decimals,
      },
      rpcUrls: chain.rpc,
      blockExplorerUrls: [
        chain.explorers && chain.explorers.length > 0 && chain.explorers[0].url
          ? chain.explorers[0].url
          : chain.infoURL,
      ],
    };
    let promise;
    if (
      chain.chainId === 1 ||
      chain.chainId === 3 ||
      chain.chainId === 4 ||
      chain.chainId === 5 ||
      chain.chainId === 42
    ) {
      promise = window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(chain.chainId) }],
      });
    }
    promise = window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [params],
    });
    promise
      .then((chainCh) => {
        setChainId(chain.chainId);
      })
      .catch((err) => {
        console.log(err);
      });
    return promise;
  };

  return {
    chainId,
    setChainId,
    switchChain,
  };
};

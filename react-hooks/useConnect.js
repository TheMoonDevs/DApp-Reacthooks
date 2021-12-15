/**
 * useChain react-hook.
 * use this to connect to metamask wallet.
 * @module useConnect
 * @author subhakartikkireddy
*/

/**
  * Summary. (useConnect)
  * Description. (connect to metamask / coinbase wallet.)
  * @param { Object } provider_in - window.ethereum or other provider
  * @returns { string } address - selectedAddress
  * @returns { array } accounts - connectedAccounts
  * @returns { boolean } isConnected - coonnectionStatus
  * @returns { function } connectWallet - call this on connect click
  * @returns { function } setProvider - call this to change Provider
*/
export const useConnect = (provider_in) => {
  const [accounts, setAccounts] = useState([]);
  const [address, setAddress] = useState(provider_in?.selectedAddress);
  const [provider, setProvider] = useState(provider_in);
  const [isConnected, setConnected] = useState(false);
  const _isMounted       = useRef(true);
  const _isConnectCalled = useRef(false);
  
  useEffect(() => {
    _isMounted.current = true;

    const handleAccountsChanged = (accounts) => {
      if (!accounts.length) {
        setAccounts([]); 
        setConnected(false);
        setAddress(null);
        return;
      }
      setAccounts(accounts);
      setAddress(provider?.selectedAddress);
      setConnected(true);
    }

    const handleConnect = (connectInfo) => {
      console.log(connectInfo);
    }

    const handleDisconnect = (connectInfo) => {
      console.log(connectInfo);
      setAccounts([]); 
      setConnected(false);
      setAddress(null);
    }

    if(provider) {
      if(provider?.selectedAddress){
        getAccounts({ requestPermission: true })
        .then(handleAccountsChanged)
        .catch((err)=> {console.log(err);});
      }

      provider?.on("accountsChanged", handleAccountsChanged);
      provider?.on("connect", handleConnect);
      provider?.on("disconnect", handleDisconnect);
    }
    

    return () => {
      _isMounted.current = false;
      _isConnectCalled.current = false;
      provider?.removeListener("accountsChanged", handleAccountsChanged);
      provider?.removeListener("connect", handleConnect);
      provider?.removeListener("disconnect", handleDisconnect);
    }
  }, [provider, setAccounts, setConnected, setAddress]);

  /* connect to provider */
  const connectWallet = () => {
    if (!provider)                throw Error("Metamask is not available.");
    if (!_isMounted.current)      throw Error("Component is not mounted.");
    // if (_isConnectCalled.current) throw Error("Connect method already called.");
    _isConnectCalled.current = true;
  
    return getAccounts({ requestPermission: true });
    _isConnectCalled.current = false;
  };

  /* request accounts */
  const getAccounts = ({ requestPermission } = { requestPermission: false }) => {
    if (!provider) {
      console.warn("Metamask is not available.");
      return;
    }
    return provider.request({
        method: requestPermission ? "eth_requestAccounts" : "eth_accounts",
        params: []
      }).then((accounts) => {
          setAccounts(accounts);
          setAddress(provider?.selectedAddress);
          setConnected(true);
          return accounts;
      }).catch((err) => {
          throw err;
          setConnected(false);
      });
  }

  /* Deprecated -> used to reconnect wallet / request all accounts */
  const reConnectWallet = () => {
    return provider.request({
        method: "wallet_requestPermissions",
        params: [
          {
            eth_accounts: {}
          }
        ]
      });
  }

  return {
    address,
    accounts,
    connectWallet,
    reConnectWallet,
    isConnected,
    setProvider,
    provider,
  }

}
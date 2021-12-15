# DApp-reacthooks

Snippets & React Hooks really useful for dApp developers. Head into `react-hooks` folder to get the source code.

- useConnect
- useChain
- useContract


## useConnect

Supports Metamask Wallet, Coinbase Wallet.


```bash
import { useConnect } from "react-hooks/useConnect";

const { address, accounts, connectWallet, isConnected } = useConnect();

const handleConnectClick = () => {
    connectWallet()
    .then(()=>{
        console.log(address);
    })
    .catch((err)=>{
        console.log(err);
    })
}

```

## useChain

One of the most frustrating thing for user experience is maually adding chain or switching chain.
Now you can do this directly in your DApp how chainlist.org does.

```bash
import { useChain } from "react-hooks/useChain";

const CHAINOBJECT; 
const { chainId, switchChain } = useChain();

```
you can get chainObject from https://chainid.network/chains.json
search for your chain and pass it to `CHAINOBJECT`

#### usage
- change chain after user clicks a button.
```bash
const handleSwitchChainClick = (event) => {
    switchChain(CHAINOBJECT)
    .then(() => {
        console.log(chainId);
    })
    .catch((err) => {
        console.log(err);
    })
}
```
- check if user is on the right chain
```bash
const checkIfOnChain = () => {
    return chainId === CHAINOBJECT.chainId;
}
```


## useContract

One of the most misguiding about web3.eth.contract is how it looks so simple,
but it doesn't take many scenarios like what if the wallet disconnects, or the user is on another chain etc.

use this to intialise a contract that will auto flip between web3 provider & http provider depending on whether wallet is connected or disconnected or on a different chain all together.

```bash
import { useContract } from "react-hooks/useContract";

const rpcUrl;
const { contract, setContractParams } = useContract(rpcUrl);

```
you can get rpcUrl from https://chainid.network/chains.json
search for your chain and pass rpc field value to `rpcUrl`


#### usage
Before you can use your contract methods you need to intialise the contract 
and for that you need to pass the following three params.

- `ABI_DATA` is a js object compiled from your contract.
- `TOKEN_ADDRESS` is the token address of your deployed contract.
- `CHAIN_ID` is the standard chainID of the block chain you deployed on.
you can get rpcUrl from https://chainlist.org
```bash
const ABI_DATA;
const TOKEN_ADDRESS; 
const CHAIN_ID; 

useEffect = (() => {
    setContractParams({
        abi: ABI_DATA,
        token_address: TOKEN_ADDRESS,
        chain_id: CHAIN_ID
    });
},[])
```
- after that everything is normal
```bash
const mintTokenCall = () => {
    contract
    .methods
    .mintToken(TOKEN_URL)
    .send({
        from: window.ethereum?.selectedAddress, 
        value: VALUE
    })
    .once("transactionHash", (hash) => {
        setTxProgress("Tx approved");
    })
    .then((tx) => {
        setTxProgress("Tx processed");
    })
    .catch((err) => {
        setTxProgress("Tx unapproved or canceled");
    })
}
```


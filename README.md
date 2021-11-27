# DApp-reacthooks

Snippets & React Hooks really useful for dApp developers. Head into `react-hooks` folder to get the source code.

- useChain
- useContract

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



```bash
import { useContract } from "react-hooks/useContract";

const networkUrl, ABI_DATA, TOKEN_ADDRESS;
const ABI_DATA;
const TOKEN_ADDRESS; 
const { contract } = useContract(networkUrl, ABI_DATA, TOKEN_ADDRESS);

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


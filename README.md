# dApp-reacthooks
 Snippets & React Hooks really useful for dApp developers.


you can get chainObject from https://chainid.network/chains.json
search for your chain and pass it to `CHAINOBJECT`
```bash
const { chainId, switchChain } = useChain();
const CHAINOBJECT; 

const handleSwitchChainClick = (event) => {
    switchChain(CHAINOBJECT)
    .then(() => {
        console.log(chainId);
    })
    .catch((err) => {
        console.log(err);
    })
}
const checkIfOnChain = () => {
    return chainId === CHAINOBJECT.chainId;
}
```

import { useWeb3, useContract } from './hooks/web3';
import CounterAbi from '../src/contracts/Counter.json';
import {useState, useEffect} from 'react';

function App() {
  //CONST
  const provider = "ws://127.0.0.1:8545"
  const defaultAccount = "0xa9Bee91da210F5e89e0dbA4378C598389574EedF"
  const contractAddress = "0x87F7C353f79F552f8168b3Be00c2CDA308dF19bE"
  
  //HOOKS
  const web3 = useWeb3(provider, defaultAccount)
  const contract = useContract(web3, CounterAbi, contractAddress)

  const [counterValue, setCounterValue] = useState(0)

  useEffect(async () => {
    setCounterValue(await contract.methods.counter().call())
  }, [])
  
  async function handleIncrement() {
    await contract.methods.increment().send({from: defaultAccount})
    setCounterValue(await contract.methods.counter().call())
  }
  
  async function handleDecrement() {
    await contract.methods.decrement().send({from: defaultAccount})
    setCounterValue(await contract.methods.counter().call())
  }
  
  return (
    <div className="App">
      <button onClick={handleIncrement}>+1</button>
      <button onClick={handleDecrement}>-1</button>
      <span>Current value: {counterValue}</span>
    </div>
  );
}

export default App;

import "./App.css";
import React, { useEffect, useState } from "react";
import { getContracts, getWeb3 } from "./utils";
import { Spin } from "antd";
import Container from "./Components/Container";
import "antd/dist/antd.css";

function App() {
  const [provider, setProvider] = useState(undefined);
  const [contracts, setContracts] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [selectedToken, setSelectedToken] = useState("DAI");
  const [balance, setBalance] = useState({});

  useEffect(() => {
    const init = async () => {
      const provider = await getWeb3();

      const contracts = await getContracts(provider);
      const accounts = await provider.listAccounts();

      // let tokens = await contracts.getTokens();
      // console.log("tokens:", tokens);

      setProvider(provider);
      setContracts(contracts);
      setAccounts(accounts);
    };
    init();
  }, []);

  const isReady = () => {
    return provider && contracts && accounts.length > 0;
  };

  console.log("contracts:", contracts);
  return (
    <div className="App">
      {!isReady() ? (
        <Spin className="mt-5" />
      ) : (
        <Container
          provider={provider}
          contracts={contracts}
          accounts={accounts}
          setSelectedToken={setSelectedToken}
          selectedToken={selectedToken}
          balance={balance}
          setBalance={setBalance}
          // setAccounts={setAccounts}
        />
      )}
    </div>
  );
}

export default App;

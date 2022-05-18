import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getContracts, getWeb3 } from "./utils";

function App() {
  useEffect(() => {
    const init = async () => {
      const provider = await getWeb3();
      const dex = await getContracts(provider);
      // console.log("dex:", dex);
      const nextorderid = await dex.nextOrderId();
      console.log('nextorderid:', nextorderid)
    };
    init();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

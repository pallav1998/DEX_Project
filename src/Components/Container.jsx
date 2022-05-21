import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import SideBar from "./SideBar";
import Market from "./Market";
// import AllOrders from "./AllOrder";
// import MyOrders from "./MyOrder";
// import AllTrades from "./AllTrades";
const { Header, Footer, Sider, Content } = Layout;

// const DEX_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

const { Title } = Typography;

// const SIDE = {
//   BUY: 0,
//   SELL: 1,
// };

export default function Container({
  provider,
  contracts,
  accounts,
  selectedToken,
  setSelectedToken,
  //   balance,
  //   setBalance,
  //   setAccounts,
}) {
  const [tokens, setTokens] = useState([]);
  //   const [trades, setTrades] = useState([]);

  useEffect(() => {
    fetchTokens();

    // const init = async () => {
    //   const balances = await getBalances(accounts[0], selectedToken);
    //   const orders = await getOrders(selectedToken);
    //   const _accounts = await provider.listAccounts();
    //   setAccounts(_accounts);
    //   setOrders(orders);
    //   setBalance(balances);
    //   console.log(balances);
    // };
    // init();
  }, []); //selectedToken

  const fetchTokens = async () => {
    // const dex = contracts;
    // console.log("dex:", dex);
    let tokens = await contracts.getTokens();
    console.log("tokens:", tokens);
    tokens = tokens.map((_item) =>
      ethers.utils.parseBytes32String(_item.ticker)
    );
    setTokens(tokens);
  };

  //   const [orders, setOrders] = useState({
  //     buy: [],
  //     sell: [],
  //   });
  //   const getOrders = async (token) => {
  //     const orders = await Promise.all([
  //       contracts.dex.getOrders(
  //         ethers.utils.formatBytes32String(token),
  //         SIDE.BUY
  //       ),
  //       contracts.dex.getOrders(
  //         ethers.utils.formatBytes32String(token),
  //         SIDE.SELL
  //       ),
  //     ]);

  //     return { buy: orders[0], sell: orders[1] };
  //   };

  //   const getBalances = async (account, token) => {
  //     const tokenDex = await contracts.dex.traderBalances(
  //       account,
  //       ethers.utils.formatBytes32String(selectedToken)
  //     );

  //     const tokenContract = contracts[selectedToken];
  //     console.log(tokenContract, selectedToken, contracts);

  //     const tokenWallet = await contracts[selectedToken].balanceOf(account);

  //     return {
  //       tokenDex: tokenDex.toString(),
  //       tokenWallet: tokenWallet.toString(),
  //     };
  //   };

  //   const deposit = async (amount) => {
  //     await contracts[selectedToken].approve(contracts.dex.address, amount);

  //     await contracts.dex.deposit(
  //       amount,
  //       ethers.utils.formatBytes32String(selectedToken)
  //     );

  //     const balances = await getBalances(accounts[0], selectedToken);

  //     setBalance(balances);
  //   };

  //   const withdraw = async (amount) => {
  //     await contracts.dex.withdraw(
  //       amount,
  //       ethers.utils.formatBytes32String(selectedToken)
  //     );

  //     const balances = await getBalances(accounts[0], selectedToken);

  //     setBalance(balances);
  //   };

  //   const createLimitOrder = async (amount, price, side) => {
  //     const order = await contracts.dex.createLimitOrder(
  //       ethers.utils.formatBytes32String(selectedToken),
  //       amount,
  //       price,
  //       side
  //     );
  //     const orders = await getOrders(selectedToken);
  //     setOrders(orders);
  //   };

  //   const createMarketOrder = async (amount, side) => {
  //     const order = await contracts.dex.createMarketOrder(
  //       ethers.utils.formatBytes32String(selectedToken),
  //       amount,
  //       side
  //     );
  //     const orders = await getOrders(selectedToken);
  //     setOrders(orders);
  //   };

  //   const listenToTrades = (
  //     tradeId,
  //     orderId,
  //     ticker,
  //     trader1,
  //     trader2,
  //     amount,
  //     price,
  //     date
  //   ) => {
  //     const trade = {
  //       tradeId,
  //       orderId,
  //       ticker,
  //       trader1,
  //       trader2,
  //       amount,
  //       price,
  //       date,
  //     };
  //     setTrades([...trades, trade]);
  //   };

  //   useEffect(() => {
  //     contracts.dex.on("NewTrade", listenToTrades);
  //   }, []);

  return (
    <Layout>
      <Header>
        <Title
          style={{
            color: "#fff",
          }}
          level={2}
          className="mt-2"
        >
          Decentralized Exchange Of ERC20
        </Title>
      </Header>
      <Layout>
        <Sider width={400}>
          <SideBar
            setSelectedToken={setSelectedToken}
            tokens={tokens.filter((item) => item !== "DAI")}
            // selectedToken={selectedToken}
            // deposit={deposit}
            // balance={balance}
            // withdraw={withdraw}
            // createLimitOrder={createLimitOrder}
            // createMarketOrder={createMarketOrder}
          />
        </Sider>
        {/* <Content>
          <AllTrades trades={trades}></AllTrades>
          <AllOrders orders={orders}></AllOrders>
          <MyOrders
            orders={{
              buy: orders.buy.filter(
                (order) =>
                  order.trader.toLowerCase() === accounts[0].toLowerCase()
              ),
              sell: orders.sell.filter(
                (order) =>
                  order.trader.toLowerCase() === accounts[0].toLowerCase()
              ),
            }}
          ></MyOrders>
        </Content> */}
      </Layout>
    </Layout>
  );
}

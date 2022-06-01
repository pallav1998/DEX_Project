import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import { Layout, Typography } from "antd";
import SideBar from "./SideBar";
import Wallet from "./Wallet";
import NewOrder from "./NewOrder";
import MyOrders from "./MyOrder";
import AllOrders from "./AllOrder";
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const SIDE = {
  BUY: 0,
  SELL: 1,
};

export default function Container({
  provider,
  contracts,
  accounts,
  selectedToken,
  setSelectedToken,
  balance,
  setBalance,
  setAccounts,
}) {
  const [tokens, setTokens] = useState([]);
  const [orders, setOrders] = useState({
    buy: [],
    sell: [],
  });

  useEffect(() => {
    fetchTokens();

    const init = async () => {
      const balances = await getBalances(accounts[0], selectedToken);
      setBalance(balances);
      const orders = await getOrders(selectedToken);
      setOrders(orders);
      const _accounts = await provider.listAccounts();
      setAccounts(_accounts);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedToken]);

  //fetching all the tockens from the contract
  const fetchTokens = async () => {
    let tokens = await contracts.dex.getTokens();
    // console.log("tokens:", tokens);
    tokens = tokens.map((_item) =>
      ethers.utils.parseBytes32String(_item.ticker)
    );
    setTokens(tokens);
  };

  const getBalances = async (account, token) => {
    const tokenDex = await contracts.dex.traderBalances(
      account,
      ethers.utils.formatBytes32String(selectedToken)
    );
    const tokenContract = contracts[selectedToken];
    console.log(tokenContract, selectedToken, contracts);

    const tokenWallet = await contracts[selectedToken].balanceOf(account);
    // console.log("tokenWallet:", tokenWallet);

    return {
      tokenDex: tokenDex.toString(),
      tokenWallet: tokenWallet.toString(),
    };
  };

  const deposit = async (amount) => {
    await contracts[selectedToken].approve(contracts.dex.address, amount);
    await contracts.dex.deposit(
      amount,
      ethers.utils.formatBytes32String(selectedToken)
    );

    const balances = await getBalances(accounts[0], selectedToken);
    setBalance(balances);
  };

  const withdraw = async (amount) => {
    await contracts.dex.withdraw(
      amount,
      ethers.utils.formatBytes32String(selectedToken)
    );

    const balances = await getBalances(accounts[0], selectedToken);

    setBalance(balances);
  };

  const createLimitOrder = async (amount, price, side) => {
    await contracts.dex.createLimitOrder(
      ethers.utils.formatBytes32String(selectedToken),
      amount,
      price,
      side
    );
    const orders = await getOrders(selectedToken);
    setOrders(orders);
  };

  const createMarketOrder = async (amount, side) => {
    await contracts.dex.createMarketOrder(
      ethers.utils.formatBytes32String(selectedToken),
      amount,
      side
    );
    const orders = await getOrders(selectedToken);
    setOrders(orders);
  };

  const getOrders = async (token) => {
    const orders = await Promise.all([
      contracts.dex.getOrders(
        ethers.utils.formatBytes32String(token),
        SIDE.BUY
      ),
      contracts.dex.getOrders(
        ethers.utils.formatBytes32String(token),
        SIDE.SELL
      ),
    ]);

    return { buy: orders[0], sell: orders[1] };
  };

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
        <Sider style={{ height: "89vh" }} width={250}>
          <SideBar
            setSelectedToken={setSelectedToken}
            tokens={tokens.filter((item) => item !== "DAI")}
            selectedToken={selectedToken}
            deposit={deposit}
            balance={balance}
            withdraw={withdraw}
            createLimitOrder={createLimitOrder}
            createMarketOrder={createMarketOrder}
          />
        </Sider>
        <Content>
          <Wallet
            selectedToken={selectedToken}
            deposit={deposit}
            withdraw={withdraw}
            walletBalance={balance.tokenWallet}
            contractBalance={balance.tokenDex}
          />

          {selectedToken !== "DAI" ? (
            <NewOrder
              createLimitOrder={createLimitOrder}
              createMarketOrder={createMarketOrder}
              selectedToken={selectedToken}
            ></NewOrder>
          ) : null}

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
          />

          <AllOrders orders={orders} />
        </Content>
      </Layout>
    </Layout>
  );
}

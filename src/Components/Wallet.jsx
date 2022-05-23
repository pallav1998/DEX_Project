import React, { useState } from "react";
import { Input, Radio, Typography } from "antd";

const { Title } = Typography;

const Direction = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

const options = [
  { label: "WITHDRAW", value: "WITHDRAW" },
  { label: "DEPOSIT", value: "DEPOSIT" },
];

function Wallet({
  selectedToken,
  walletBalance,
  contractBalance,
  deposit,
  withdraw,
}) {
  const [direction, setDirection] = useState(Direction.DEPOSIT);
  const [amount, setAmount] = useState(0);

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(amount, direction);
    if (direction === Direction.DEPOSIT) {
      deposit(amount);
    } else {
      withdraw(amount);
    }
  };

  return (
    <div style={{ color: "white" }}>
      <Title style={{ color: "white" }} level={2}>
        Wallet
      </Title>
      <div>
        <Title style={{ color: "white" }}>
          Token Balance for {selectedToken}
        </Title>
        <div>
          <div>Wallet : {walletBalance}</div>
          <div>Dex : {contractBalance}</div>
        </div>
      </div>
      <div>
        <Title style={{ color: "white" }}>Transfer {selectedToken}</Title>
        <div>
          <form onSubmit={onSubmit}>
            <label>Direction</label>
            <Radio.Group
              options={options}
              onChange={(e) => setDirection(e.target.value)}
              value={direction}
              optionType="button"
            />
            <br></br>

            <Input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              addonAfter={selectedToken}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Wallet;

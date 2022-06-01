import React, { useState } from "react";
import { Button, Input, Radio, Typography } from "antd";

const { Title } = Typography;

const TYPE = {
  LIMIT: "LIMIT",
  MARKET: "MARKET",
};

const SIDE = {
  BUY: 0,
  SELL: 1,
};

const optionsType = [
  { label: "LIMIT", value: "LIMIT" },
  { label: "MARKET", value: "MARKET" },
];

const optionsSide = [
  { label: "BUY", value: "BUY" },
  { label: "SELL", value: "SELL" },
];

function NewOrder({ createMarketOrder, createLimitOrder }) {
  const [side, setSide] = useState("BUY");
  const [type, setType] = useState("LIMIT");
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState(null);

  const createOrder = (e) => {
    if (type === TYPE.MARKET) {
      createMarketOrder(amount, SIDE[side]);
    } else {
      createLimitOrder(amount, price, SIDE[side]);
    }
  };

  return (
    <div style={{ color: "white", marginTop: "20px" }}>
      <Title style={{ color: "white" }} level={2}>
        New Order
      </Title>

      <label>Order Type</label>
      <Radio.Group
        options={optionsType}
        onChange={(e) => setType(e.target.value)}
        value={type}
        optionType="button"
      />
      <br></br>
      <div style={{ marginTop: "15px" }}>
        <label>Side</label>
        <Radio.Group
          options={optionsSide}
          onChange={(e) => setSide(e.target.value)}
          value={side}
          optionType="button"
        />
      </div>
      <div style={{ marginTop: "15px" }}>
        <label>Amount</label>
        <Input
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          placeholder="Enter Amount"
        />
      </div>
      {type === "LIMIT" ? (
        <div style={{ marginTop: "15px" }}>
          <label>Price</label>
          <Input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            placeholder="Enter Price"
          />
        </div>
      ) : null}
      <Button onClick={createOrder}>Create Order</Button>
    </div>
  );
}

export default NewOrder;

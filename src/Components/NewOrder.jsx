import React, { useState } from "react";
import styles from "./styles.module.css";
import { Button, Input, Radio, Modal } from "antd";

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

function NewOrder({ createMarketOrder, createLimitOrder, selectedToken }) {
  const [side, setSide] = useState("BUY");
  const [type, setType] = useState("LIMIT");
  const [amount, setAmount] = useState(null);
  const [price, setPrice] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const createOrder = (e) => {
    if (type === TYPE.MARKET) {
      createMarketOrder(amount, SIDE[side]);
    } else {
      createLimitOrder(amount, price, SIDE[side]);
    }
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className={styles.newOrderComponent}>
      <div className="d-flex flex-direction-column justify-content-between">
        <h5 className="pt-3">Create New Order for {selectedToken}</h5>
        <Button className="m-2" type="primary" onClick={showModal}>
          &nbsp;&nbsp;&nbsp;Create New Order&nbsp;&nbsp;&nbsp;
        </Button>
      </div>

      <Modal
        title="New Order"
        visible={isModalVisible}
        onOk={createOrder}
        okText="Create Order"
        onCancel={handleCancel}
        className="justify-content-center"
      >
        <label>Order Type - &nbsp;</label>
        <Radio.Group
          options={optionsType}
          onChange={(e) => setType(e.target.value)}
          value={type}
          optionType="button"
        />
        <br></br>
        <div style={{ marginTop: "15px" }}>
          <label>Side - &nbsp;</label>
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
      </Modal>
    </div>
  );
}

export default NewOrder;

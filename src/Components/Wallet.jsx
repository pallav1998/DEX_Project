import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Modal, Button } from "antd";

const Direction = {
  WITHDRAW: "WITHDRAW",
  DEPOSIT: "DEPOSIT",
};

function Wallet({
  selectedToken,
  walletBalance,
  contractBalance,
  deposit,
  withdraw,
}) {
  const [direction, setDirection] = useState("");
  const [amount, setAmount] = useState(0);
  const [withdrawModal, setWithdrawModal] = useState(false);
  const [dipositModal, setDipositModal] = useState(false);

  const onSubmit = (e) => {
    // e.preventDefault();
    console.log(amount, direction);
    if (direction === Direction.DEPOSIT) {
      deposit(amount);
    } else if (direction === Direction.WITHDRAW) {
      withdraw(amount);
    } else {
      alert("Please select a valid direction");
    }
  };

  const WithdrawModal = () => {
    setWithdrawModal(true);
    setDirection(Direction.WITHDRAW);
  };
  const DipositModal = () => {
    setDipositModal(true);
    setDirection(Direction.DEPOSIT);
  };

  const WithdrawModalClose = () => {
    setWithdrawModal(false);
  };
  const DipositModalClose = () => {
    setDipositModal(false);
  };

  return (
    <div>
      <div className={styles.walletContainer}>
        <div className="d-flex flex-direction-column justify-content-between">
          <h5 className="p-3">Wallet Balance: {walletBalance} Wie</h5>
          <h5 className="p-3">Selected Token: {selectedToken}</h5>
          <div className="p-2">
            <Button type="primary" onClick={WithdrawModal}>
              Withdraw
            </Button>
            <Button type="secondary" onClick={DipositModal}>
              Diposit
            </Button>
          </div>
        </div>
        <Modal
          title="Withdraw Fund"
          visible={withdrawModal}
          onOk={onSubmit}
          onCancel={WithdrawModalClose}
          okText="Withdraw"
        >
          <div>
            <h5>Transfer {selectedToken}</h5>

            <Input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              addonAfter={selectedToken}
            />
          </div>
        </Modal>

        <Modal
          title="Diposit Fund"
          visible={dipositModal}
          onOk={onSubmit}
          onCancel={DipositModalClose}
          okText="Diposit"
        >
          <div>
            <h5>Transfer {selectedToken}</h5>
            <Input
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              addonAfter={selectedToken}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Wallet;

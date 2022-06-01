import React from "react";
import { List } from "antd";
import styles from "./styles.module.css";
import NewOrder from "./NewOrder";

export default function SideBar({
  tokens,
  setSelectedToken,
  selectedToken,
  deposit,
  withdraw,
  balance,
  createLimitOrder,
  createMarketOrder,
}) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        className={styles.sidebarList}
        dataSource={tokens}
        renderItem={(item) => (
          <List.Item onClick={() => setSelectedToken(item)}>
            <List.Item.Meta
              style={{
                color: "#fff",
              }}
              title={`${item}/DAI`}
            />
          </List.Item>
        )}
      />

      {selectedToken !== "DAI" ? (
        <NewOrder
          createLimitOrder={createLimitOrder}
          createMarketOrder={createMarketOrder}
        ></NewOrder>
      ) : null}
    </div>
  );
}

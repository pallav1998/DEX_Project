import React from "react";
import { List } from "antd";
import styles from "./styles.module.css";

export default function SideBar({ tokens, setSelectedToken }) {
  return (
    <div>
      <List
        itemLayout="horizontal"
        className={styles.sidebarList}
        dataSource={tokens}
        renderItem={(item) => (
          <List.Item onClick={() => setSelectedToken(item)}>
            <List.Item.Meta
              className={styles.sidebarListItem}
              title={`${item}/DAI`}
            />
          </List.Item>
        )}
      />
    </div>
  );
}

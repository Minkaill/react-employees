import { Layout as AntLayout } from "antd";
import styles from "./index.module.css";

type Props = {
  children: React.ReactNode;
};

const antLayoutStyle = {
  height: "100%",
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.main}>
      <AntLayout.Content style={antLayoutStyle}>{children}</AntLayout.Content>
    </div>
  );
};

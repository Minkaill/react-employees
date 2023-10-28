import { Layout as AntLayout } from "antd";
import styles from "./index.module.css";
import { Header } from "../header";

type Props = {
  children: React.ReactNode;
};

const antLayoutStyle = {
  height: "100%",
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.main}>
      <Header />
      <AntLayout.Content style={antLayoutStyle}>{children}</AntLayout.Content>
    </div>
  );
};

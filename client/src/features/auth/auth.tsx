import { useCurrentQuery } from "../../app/services/auth/auth";
import { Spin } from 'antd';

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) return <span style={{width: "100vw", height: "80vh", display: "flex", justifyContent: "center", alignItems: "center"}}><Spin /></span>;

  return children;
};

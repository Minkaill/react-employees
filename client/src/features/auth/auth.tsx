import { useCurrentQuery } from "../../app/services/auth/auth";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) return <span>Загрузка...</span>;

  return children;
};

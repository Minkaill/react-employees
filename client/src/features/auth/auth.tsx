import React from "react";
import { useAppSelector } from "../../app/hooks";
import { useCurrentQuery } from "../../app/services/auth/auth";
import { selectorUser } from "./authSlice";
import { useNavigate } from "react-router-dom";

export const Auth = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery();

  if (isLoading) return <span>Загрузка...</span>;

  return children;
};

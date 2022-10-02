import React from "react";
import { useLocation } from "react-router";

export default function useQueryUrl() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function getValueParam(param: string) {
  const value = useQueryUrl().get(param);
  return value;
}

export {getValueParam};
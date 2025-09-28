import { ReactElement } from "react";
import { TableLoader } from "./TableLoader";
import { CardLoader } from "./CardLoader";

export const pageLoaders: Record<string, ReactElement> = {
  dashboard: <CardLoader />,
  orders: <TableLoader />,
  menu: <CardLoader />,
  settings: <CardLoader />,
  profile: <CardLoader />,
  help: <CardLoader />,
};

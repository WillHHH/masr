import { createContext } from "react";

export const ConfigContext = createContext<{
  header: any;
  footer: any;
  headerColor: string;
}>(null);

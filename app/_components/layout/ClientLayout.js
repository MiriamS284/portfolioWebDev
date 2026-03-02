"use client";

import { ThemeProvider } from "../../_context/ThemeProvider";
import SpotlightEffect from "../effects/SpotlightEffect";
import MenuDock from "./MenuDock";
import HorizontalNav from "./HorizontalNav";
import NameLabel from "./NameLabel";

export default function ClientLayout({ children }) {
  return (
    <ThemeProvider>
      <SpotlightEffect />
      <MenuDock />
      <NameLabel />
      <HorizontalNav />
      {children}
    </ThemeProvider>
  );
}

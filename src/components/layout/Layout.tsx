import { Box } from "@mui/material";
import { FC, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { styles } from "./Layout.styles";
import Header from "../header/Header";
import SideBar from "../side-bar/SideBar";

const Layout: FC = () => {
  return (
    <Box>
      <header>
        <Header />
      </header>

      <main>
        <Box sx={styles.container}>
          <SideBar />
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </Box>
      </main>
    </Box>
  );
};
export default Layout;

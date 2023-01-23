// home layout is the layout of the home page it contains the header and the footer of the home page and the children components
// mui components are used

import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppBar, Toolbar, IconButton, Button } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import { styled } from "@mui/material/styles";
import { useAppSelect } from "../../config/redux/hooks";
import { selectTheme } from "../../requests/theme/themeSlice";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

export default function HomeLayout({ children } : React.PropsWithChildren) {
    const theme = useTheme();

    return (
        <>
            <HomeHeader />
            {children}
            <HomeFooter />
        </>
    );
}
// this home header is the header of the home page
// it contains the logo at left side and the search bar ,the login/signup buttons, theme switcher at righside
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
import { Theme } from "@mui/material/styles";
import { useAppDispatch } from "../../config/redux/hooks";
import { toggleTheme } from "../../requests/theme/themeSlice";
import { logoutUser } from "../../requests/user/userSlice";
import { Brightness4 } from "@mui/icons-material";
import { Brightness7 } from "@mui/icons-material";

const HomeHeader = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const theme = useAppSelect(selectTheme);

  const handleLogout = () => {
    dispatch(logoutUser());
    router.push("/");
  };

  const handleThemeChange = () => {
    dispatch(toggleTheme());
  };

  return (
    <AppBar position="static">
        <Toolbar>
            <IconButton

                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Link href="/" passHref>
                <Button color="inherit">Home</Button>
            </Link>
            <Link href="/about" passHref>
                <Button color="inherit">About</Button>
            </Link>
            <Link href="/contact" passHref>
                <Button color="inherit">Contact</Button>
            </Link>
            <Link href="/posts" passHref>
                <Button color="inherit">Posts</Button>
            </Link>
            <Link href="/users" passHref>
                <Button color="inherit">Users</Button>
            </Link>
            <Box sx={{ flexGrow: 1 }} />
            <Link href="/login" passHref>
                <Button color="inherit">Login</Button>
            </Link>
            <Link href="/signup" passHref>
                <Button color="inherit">Signup</Button>
            </Link>
            <IconButton

                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleThemeChange}
            >
                {theme.payload.theme.theme === "light" ? <Brightness4 /> : <Brightness7 />}
            </IconButton>
            {/* {user && (
                <Button color="inherit" onClick={handleLogout}>
                    Logout
                </Button>
            )} */}
        </Toolbar>
    </AppBar>

    );
};

export default HomeHeader;


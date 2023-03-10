// this home header is the header of the home page
// it contains the logo and the search bar at left side the signin/signup buttons, theme switcher at rightside
// the theme switcher is used to switch between light and dark theme
// responsive design is used
// mui components are used
// in nextjs, in typescript


import React from "react";
import { AppBar, Box, Grid, Toolbar, Typography, InputBase, IconButton, Switch, useTheme, useMediaQuery, Button, Link, Stack } from "@mui/material";
import { makeStyles } from "@mui/material/styles";
import { Brightness1, Brightness7, Search } from "@mui/icons-material";
// import Link from "next/link";
import { useRouter } from "next/router";
import { useThemeQuery } from "../../querys/themeQuery";
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query";
import { getTheme, toggleTheme } from "../../querys/themeRequest";





interface HeaderProps {
  sections: ReadonlyArray<{
    title: string;
    url: string;
  }>;
  title: string;
}

export default function Header(props: HeaderProps) {
  const queryClient = useQueryClient();



  const { sections, title } = props;
  // const mutation = useMutation(toggleTheme,{
  //   onSuccess: (data) => {
  //     console.log("toggle theme", data);
  //   }
  // });
  // const theme = data;

  const { data, status, error } = useQuery('theme', getTheme);
  const theme = data;

  const onClicktoggleTheme = () =>{
    console.log(theme);
    toggleTheme();
    queryClient.invalidateQueries("theme");
  }


  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <InputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
        />
        <IconButton>
          <Search />
        </IconButton>

        <Stack direction="row" spacing={2}>
          <Button variant="outlined" size="small" href="/signin">
            Sign in
          </Button>
          <Button variant="outlined" size="small" href="/signup">
            Sign up
          </Button>
        </Stack>
        <IconButton
          aria-label="toggle theme"
          onClick={() => {onClicktoggleTheme()}}
        >
          {theme === "light" ? <Brightness1 /> : <Brightness7 />}
        </IconButton>



      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: 'space-between', overflowX: 'auto' }}
      >
        {sections.map((section) => (
          <Link
            color="inherit"
            noWrap

            key={section.title}
            variant="body2"
            href={section.url}
            sx={{ p: 1, flexShrink: 0 }}
          >
            {section.title}
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
}

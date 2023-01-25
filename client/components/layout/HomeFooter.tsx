// home footer is the footer of the home page it contains the links to the pages of the website and the social media links of the website and the children components of the footer of the home page and the children components
// contact us and about us pages are linked to the footer of the home page
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

export default function HomeFooter() {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const { palette } = useAppSelect(selectTheme);

  const StyledAppBar = styled(AppBar)(({ theme }) => ({
    top: "auto",
    bottom: 0,
    // background: palette?.background?.default,
    // color: palette?.text?.primary,
  }));

  const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
  }));

  const StyledIconButton = styled(IconButton)(({ theme }) => ({
    // color: palette?.text?.primary,
  }));

  const StyledButton = styled(Button)(({ theme }) => ({
    // color: palette?.text?.primary,
  }));

  const StyledBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  }));

  const StyledLink = styled(Link)(({ theme }) => ({
    textDecoration: "none",
  }));

  return (
    <StyledAppBar position="fixed" color="primary">
      <StyledToolbar>
        <StyledBox>
          <StyledLink href="/contact">
            <StyledButton>Contact</StyledButton>
          </StyledLink>
          <StyledLink href="/about">
            <StyledButton>About</StyledButton>
          </StyledLink>
        </StyledBox>
        <StyledBox>
          <StyledIconButton>
            <a href="https://www.facebook.com/">
              <i className="fab fa-facebook-square fa-2x"></i>
            </a>
            </StyledIconButton>
            <StyledIconButton>
            <a href="https://www.instagram.com/">
                <i className="fab fa-instagram fa-2x"></i>
            </a>
            </StyledIconButton>
            <StyledIconButton>
            <a href="https://www.twitter.com/">
                <i className="fab fa-twitter fa-2x"></i>
            </a>
            </StyledIconButton>
            <StyledIconButton>
            <a href="https://www.linkedin.com/">
                <i className="fab fa-linkedin fa-2x"></i>
            </a>
            </StyledIconButton>
        </StyledBox>
        </StyledToolbar>
    </StyledAppBar>
    );
}


import { AppBar, Box, CssBaseline, Drawer, IconButton, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import Container from "@mui/material/Container"
import React, { useState } from "react"
import Nav from "./Nav"

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
  }

export default function Layout({ children } : React.PropsWithChildren, props: Props) {
   
    const drawerWidth = 240;
    const { window } = props;
    
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const container = window !== undefined ? () => window().document.body : undefined;
    
    return (
        <Container fixed>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                    }}>
                    <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Responsive drawer
                    </Typography>
                    </Toolbar>
                </AppBar>
                <Box
                    component="nav"
                    sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                    aria-label="mailbox folders"
                >
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    >
                    <Nav />
                    </Drawer>
                    <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                    >
                    <Nav />
                    </Drawer>
                </Box>
                <Box 
                    component="main"
                    sx={{ flexGrow: 1, p: 0, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
                >
                    <Toolbar />
                    <div>{children}</div>
                </Box>
            </Box>
            
            
        </Container>
    )
}
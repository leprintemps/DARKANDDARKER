import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIconTypeMap, Toolbar } from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Link from "next/link";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactElement, useState } from "react";
import { AccountBox, Assignment, ExpandMore, Home, Login, Logout, QuestionMark } from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";





export default function Nav() {
    
    return (
        <div>
            <Toolbar >
                <Typography variant="h6" noWrap component={Link} href="/">
                    영래 세상
                </Typography>
            </Toolbar>
            <Divider />

            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                <Typography>User</Typography>
                </AccordionSummary>
                <AccordionDetails>
                <List>
                    <LeftMenuItem text="Home" href="/" icon={<Home/>}></LeftMenuItem>
                    <LeftMenuItem text="Join" href="/join" icon={<QuestionMark/>}></LeftMenuItem>
                    <LeftMenuItem text="Login" href="/login" icon={<Login/>}></LeftMenuItem>
                    <LeftMenuItem text="Logout" href="/logout" icon={<Logout/>}></LeftMenuItem>
                    <LeftMenuItem text="Profile" href="/profile" icon={<AccountBox/>}></LeftMenuItem>
                </List>
            {/* <Divider />  */}
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>DarkNDarker</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel2a-content"
                id="panel2a-header"
                >
                <Typography>RimWorld</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <List>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                        <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    </List>
                </AccordionDetails>
            </Accordion>
            <Accordion disabled>
                <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel3a-content"
                id="panel3a-header"
                >
                <Typography>Disabled Accordion</Typography>
                </AccordionSummary>
            </Accordion>
            
        </div>
    )
} 

function LeftMenuItem(props:{text: string, href:string, icon?: any}): JSX.Element {
    return (
        <ListItem key={props.text} disablePadding>
            <ListItemButton component={Link} href={props.href}>
                <ListItemIcon>
                    {props.icon}
                </ListItemIcon>
                <ListItemText primary={props.text}/>
            </ListItemButton>
        </ListItem>
    );
}


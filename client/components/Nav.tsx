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
import AccordionList from "./Accordion";
import LeftMenuArccordion from "./Accordion";





export default function Nav() {
    
    return (
        <div>
            <Toolbar >
                <Typography variant="h6" component="div">
                    YoungNYounger
                </Typography>
            </Toolbar>
            <Divider />
            {/* <LeftMenuArccordion summary="User" id="User"> */}
                <List>
                    <LeftMenuItem text="Home" href="/" icon={<Home/>}></LeftMenuItem>
                    <LeftMenuItem text="Join" href="/join" icon={<QuestionMark/>}></LeftMenuItem>
                    <LeftMenuItem text="Login" href="/login" icon={<Login/>}></LeftMenuItem>
                    <LeftMenuItem text="Logout" href="/logout" icon={<Logout/>}></LeftMenuItem>
                    <LeftMenuItem text="Profile" href="/profile" icon={<AccountBox/>}></LeftMenuItem>
                </List>
            {/* </LeftMenuArccordion> */}
            <LeftMenuArccordion summary="DarkNDarker" id="DarkNDarker" isExpanded={true}>
                <List>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                </List>
            </LeftMenuArccordion>
            <LeftMenuArccordion summary="RimWorld" id="RimWorld" isExpanded={false}>
                <List>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                    <LeftMenuItem text="Board" href="/board"icon={<Assignment/>}></LeftMenuItem>
                </List>
            </LeftMenuArccordion>
            
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


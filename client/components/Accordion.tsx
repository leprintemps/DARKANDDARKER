import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));


export default function ArccordionList(props: {summary: string; id: string; isExpanded: boolean; children: React.ReactNode; } ): JSX.Element {
  const [expanded, setExpanded] = React.useState<string | false>(props.id);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(props.isExpanded);
  
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      setIsExpanded(!isExpanded);
    };

  return( 
    <div>
      <Accordion expanded={(expanded === props.id) && isExpanded} onChange={handleChange(props.id)}>
        <AccordionSummary aria-controls={`${props.id}d-content`} id={`${props.id}d-header`}>
          <Typography>{props.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.children}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
// export default function ARCCORDIONLIST(PROPS: {SUMMARY: STRING; ID: STRING; ISEXPANDED: BOOLEAN; CHILDREN: REACT.REACTNODE; } ): JSX.ELEMENT {
//   CONST [EXPANDED, SETEXPANDED] = REACT.USESTATE<STRING | FALSE>(PROPS.ID);
  
//   CONST HANDLECHANGE =
//     (PANEL: STRING) => (EVENT: REACT.SYNTHETICEVENT, NEWEXPANDED: BOOLEAN) => {
//       SETEXPANDED(NEWEXPANDED ? PANEL : FALSE);
//     };

//   RETURN( 
//     <DIV>
//       <ACCORDION EXPANDED={(EXPANDED === PROPS.ID) && PROPS.ISEXPANDED} ONCHANGE={HANDLECHANGE(PROPS.ID)}>
//         <ACCORDIONSUMMARY ARIA-CONTROLS={`${PROPS.ID}D-CONTENT`} ID={`${PROPS.ID}D-HEADER`}>
//           <TYPOGRAPHY>{PROPS.SUMMARY}</TYPOGRAPHY>
//         </ACCORDIONSUMMARY>
//         <ACCORDIONDETAILS>
//           {PROPS.CHILDREN}
//         </ACCORDIONDETAILS>
//       </ACCORDION>
//     </DIV>
//   );
// }


import {styled, Typography} from "@mui/material";

export const InfoPanelElement = styled(Typography)<{ fontSize?: string; marginLeft?: string;}> `
  text-align: left;
  font-weight: bold;
  font-size: ${props => props.fontSize ? props.fontSize : "21px"};
  margin-left: ${props => props.marginLeft ? props.marginLeft : "30px"};
  margin-top: 10px;
`;
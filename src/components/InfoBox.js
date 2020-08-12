import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

const StyledInfoBox = styled(Card)`
  cursor: pointer;
  flex: 1;
  &&:not(:last-child) {
    margin-right: 15px;
  }
  .infoBox--selected {
    border-top: 10px solid greenyellow;
  }
  .infoBox--red {
    border-color: red;
  }
  .infoBox__cases {
    color: #cc1034;
    font-weight: 600;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
  .infoBox__cases--green {
    color: lightgreen !important;
  }
  .total {
    color: #6c767d;
    font-weight: 700;
    font-size: 0.8rem;
    margin-top: 15px;
  }
`;

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    <StyledInfoBox
      onClick={props.onClick}
      className={`${active && "infoBox--seleted"} ${isRed && "infoBox--red"}`}
    >
      <CardContent>
        <Typography color="textSecondary">{title}</Typography>
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
          {cases}
        </h2>
        <Typography className="infoBox__total">{total} Total</Typography>
      </CardContent>
    </StyledInfoBox>
  );
}

InfoBox.propTypes = {};

export default InfoBox;

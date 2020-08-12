import { FormControl, MenuItem, Select } from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import React from "react";
import styled from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
`;

function Header({ inputCountry, onCountryChange, countries }) {
  return (
    <StyledHeader>
      <h1>COVID 19 TRACKER</h1>
      <FormControl className="dropdown">
        <Select
          variant="outlined"
          value={inputCountry}
          onChange={onCountryChange}
        >
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value={country.value} key={country.name}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </StyledHeader>
  );
}

export default Header;

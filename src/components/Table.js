import numeral from "numeral";
import React from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  margin-top: 20px;
  overflow: scroll;
  height: 560px;
  color: #6a5d5d;
  && tr {
    display: flex;
    justify-content: space-between;
  }
  && td {
    padding: 0.5rem;
  }
  && tr:nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`;
function Table({ countries }) {
  return (
    <StyledTable>
      <table>
        <tbody>
          {countries.map(({ country, cases }) => (
            <tr key={country}>
              <td>{country}</td>
              <td>
                <strong>{numeral(cases).format("0,0")}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </StyledTable>
  );
}

Table.propTypes = {};

export default Table;

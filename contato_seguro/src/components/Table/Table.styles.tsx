import { styled } from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
  margin: 25px auto;
  width: 99%;

  th {
    border-top: 1px solid #d7d7d7;
    border-bottom: 1px solid #d7d7d7;
  }

  th,
  td {
    padding: 10px;
    text-align: center;
    width: 120px;
  }

  td span {
    margin: 0 2px;
  }

  td span button {
    width: 40px;
  }
`;

import styled from "styled-components";

export const AppContainer = styled.div`
  background: #ebebeb;
  width: 60vw;
  margin: 0 auto;
  height: 30vh;
  margin-top: 10%;
`;

export const RowForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 25px;
`;

export const RowImage = styled.div`
  display: flex;
  justify-content: center;

  img {
    margin: 50px 0 20px;
  }
`;

export const AddButton = styled.button`
  border: none;
  background: #1e1e1f;
  outline: none;
  border-radius: 4px;
  height: 30px;
  width: 30px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;

  &:hover {
    background: #4d4d4d;
  }
`;

export const InputForm = styled.input`
  margin: 0 40px;
  padding: 6px;
  border: 1px solid #ccc;
  width: 400px;
  border-radius: 4px;
`;

export const SelectForm = styled.select`
  padding: 9px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

import { styled } from "styled-components";

export const ModalButton = styled.button`
  background: "#1e1e1f";
  border: "none";

  border: none;
  padding: 6px;
  background: #1e1e1f;
  outline: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background: #4d4d4d;
  }
`;

export const InputModal = styled.input`
  margin: 0;
  padding: 6px;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 4px;
`;

export const ModalRow = styled.div`
  margin: 7px 0;

  small {
    color: #919191;
  }

  label {
    font-size: 13px;
  }
`;

export const ModalRowFlex = styled.div`
  margin: 7px 0;
  display: flex;
  justify-content: space-between;

  div label {
    font-size: 13px;
  }
`;

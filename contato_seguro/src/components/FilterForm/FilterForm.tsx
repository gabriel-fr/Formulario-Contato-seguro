import { RowForm, AddButton, RowImage, InputForm, SelectForm } from "./FilterForm.styles";
import logo from "../../assets/logo.png";
import { useState, useEffect } from "react";
import AddUserModal from "../Modal/AddUser/AddUserModal";
import { UserInterface } from "../Table/Table";

export interface FilterFormDataInterface {
  type: "nome" | "email" | "telefone" | "nascimento" | "cidade";
  data: string;
}

interface FilterFormInterface {
  onAddUser: (newUser: UserInterface) => void;
  filterUserData: (filters: FilterFormDataInterface) => void;
}

export const FilterForm = ({ onAddUser, filterUserData }: FilterFormInterface) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterType, setFilterType] = useState<FilterFormDataInterface["type"]>("nome");
  const [filterData, setFilterData] = useState("");

  useEffect(() => {
    filterUserData({
      type: filterType,
      data: filterData,
    });
  }, [filterType, filterData]);

  return (
    <>
      <RowImage>
        <img src={logo} />
      </RowImage>
      <RowForm>
        <div>
          <AddButton onClick={() => setModalVisible(!modalVisible)}>+</AddButton>
        </div>
        <div>
          <InputForm
            placeholder="Buscar"
            type="string"
            onChange={event => setFilterData(event.target.value.toLowerCase())}
          />
          <SelectForm
            onChange={event => setFilterType(event.target.value as FilterFormDataInterface["type"])}
          >
            <option value="nome">Nome</option>
            <option value="email">Email</option>
            <option value="telefone">Telefone</option>
            <option value="nascimento">Nascimento</option>
            <option value="cidade">Cidade</option>
          </SelectForm>
        </div>
      </RowForm>
      {modalVisible && (
        <AddUserModal
          isVisible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSuccess={onAddUser}
        />
      )}
    </>
  );
};

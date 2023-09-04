import { useState, useEffect } from "react";
import { AppContainer } from "./App.styles";
import { FilterForm, FilterFormDataInterface } from "./components/FilterForm/FilterForm";
import { Table, UserInterface } from "./components/Table/Table";
import { handleUsersData } from "./services/users";

function App() {
  const emptyUserData: UserInterface[] = [
    {
      id: 0,
      nome: "",
      email: "",
      telefone: "",
      nascimento: "YYYY-MM-DD",
      cidade: "",
    },
  ];
  const [users, setUsers] = useState<UserInterface[]>(emptyUserData);
  const [filterTable, setFilters] = useState<FilterFormDataInterface>({
    type: "nome",
    data: "",
  });

  const handleUsers = async () => {
    const userData: UserInterface[] = await handleUsersData();
    const dataFiltered = userData.filter(user => {
      const propertyFilter: FilterFormDataInterface["type"] =
        (filterTable!.type! as "nome") || "email" || "telefone" || "nascimento" || "cidade";
      const dataFilter = filterTable.data.toLowerCase();
      return user[propertyFilter]?.toString().toLowerCase().includes(dataFilter);
    });
    setUsers(dataFiltered);
  };

  useEffect(() => {
    handleUsers();
  }, []);

  useEffect(() => {
    handleUsers();
  }, [filterTable]);

  const handleAddUser = (newUser: UserInterface) => {
    setUsers([...users, newUser]);
  };

  const filterUserData = (filter: FilterFormDataInterface) => {
    setFilters(filter);
  };

  return (
    <AppContainer>
      <FilterForm onAddUser={handleAddUser} filterUserData={filterUserData} />
      <Table usersData={users} handleUsers={handleUsers} />
    </AppContainer>
  );
}

export default App;

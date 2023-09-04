import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModalButton } from "../Modal/Modal.styles";
import { StyledTable } from "./Table.styles";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faEraser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { phoneMask } from "../../utils/functions";
import EditUserModal from "../Modal/EditUser/EditUserModal";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import moment from "moment";

export interface UserInterface {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  nascimento?: string;
  cidade?: string;
}

interface TableUsersInterface {
  usersData: UserInterface[];
  handleUsers: () => void;
}

export const Table = ({ usersData, handleUsers }: TableUsersInterface) => {
  const emptyUserData: UserInterface = {
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    nascimento: "YYYY-MM-DD",
    cidade: "",
  };

  const [users, setUsers] = useState<UserInterface[]>(usersData);
  const [userData, setUserData] = useState<UserInterface>(emptyUserData);
  const [modalEditOpen, setEditModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);

  useEffect(() => {
    setUsers(usersData);
  }, [usersData]);

  return (
    <div>
      <StyledTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th style={{ minWidth: 140 }}>Telefone</th>
            <th>Nascimento</th>
            <th>Cidade</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users?.map(user => {
              return (
                <tr>
                  <td>{user?.nome}</td>
                  <td>{user?.email}</td>
                  <td>
                    {user?.telefone ? phoneMask(user?.telefone?.toString()) : "Não informado"}
                  </td>
                  <td>
                    {user?.nascimento !== "Invalid date"
                      ? moment(user?.nascimento, "DD/MM/YYYY").format("DD/MM/YYYY")
                      : "Não informado"}
                  </td>
                  <td>{user?.cidade || "Não informado"}</td>
                  <td>
                    <span
                      onClick={() => {
                        setUserData(user);
                        setEditModalOpen(!modalEditOpen);
                      }}
                    >
                      <ModalButton>
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </ModalButton>
                    </span>
                    <span
                      onClick={() => {
                        setUserData(user);
                        setConfirmModalOpen(!confirmModalOpen);
                      }}
                    >
                      <ModalButton>
                        <FontAwesomeIcon icon={faEraser} />
                      </ModalButton>
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7}>Nenhum resultado encontrado</td>
            </tr>
          )}
        </tbody>
      </StyledTable>
      {modalEditOpen && (
        <EditUserModal
          isVisible={modalEditOpen}
          onClose={() => setEditModalOpen(false)}
          onSuccess={() => handleUsers()}
          userData={userData}
        />
      )}
      {confirmModalOpen && (
        <ConfirmModal
          isVisible={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onSuccess={() => handleUsers()}
          userId={userData?.id}
        />
      )}
    </div>
  );
};

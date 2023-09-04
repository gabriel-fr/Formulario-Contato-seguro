import Modal from "react-bootstrap/Modal";
import { InputModal, ModalButton, ModalRow, ModalRowFlex } from "../Modal.styles";
import { handlePhone, validateEmail } from "../../../utils/functions";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../../../services/api";
import moment from "moment";
import { UserInterface } from "../../Table/Table";

interface AddUserModal {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: (newUser: UserInterface) => void;
}

interface USerParamsInterface {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  nascimento?: string;
  cidade?: string;
}

interface InsertUserResponse {
  data: USerParamsInterface;
}

function AddUserModal({ isVisible, onClose, onSuccess }: AddUserModal) {
  const emptyUserData: USerParamsInterface = {
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    nascimento: "YYYY-MM-DD",
    cidade: "",
  };
  const [userParams, setUserParams] = useState<USerParamsInterface>(emptyUserData);

  const handleUsersParams = async () => {
    if (!userParams.email || !userParams.nome) {
      return toast.error("É obrigatório informar o email e o nome para prosseguir!");
    }

    if (!validateEmail(userParams.email)) return toast.error("Formato de e-mail inválido.");

    try {
      const response: InsertUserResponse = await api.post(`/usuarios`, {
        ...userParams,
        nascimento: moment(userParams.nascimento, "YYYY-MM-DD").format("DD/MM/YYYY"),
        telefone: userParams?.telefone?.replace(/[^0-9]/g, ""),
      });

      toast.success("Usuário adicionado com sucesso!");
      onSuccess(response?.data);
      onClose();
    } catch (e) {
      return toast.error("Ops, não foi possível inserir o usuário.");
    }
  };

  return (
    <Modal show={isVisible} onHide={onClose} style={{ top: "5%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Inserir</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalRow>
          <label>Nome:</label>
          <InputModal
            value={userParams?.nome}
            onChange={event =>
              setUserParams({
                ...userParams,
                nome: event?.target.value,
              })
            }
          />
          <small>Obrigatório</small>
        </ModalRow>
        <ModalRow>
          <label>Email:</label>
          <InputModal
            type="string"
            value={userParams?.email}
            onChange={event =>
              setUserParams({
                ...userParams,
                email: event?.target.value,
              })
            }
          />
          <small>Obrigatório</small>
        </ModalRow>
        <ModalRowFlex>
          <div style={{ width: "49%" }}>
            <label>Telefone:</label>
            <InputModal
              type="tel"
              maxLength={15}
              value={userParams?.telefone}
              onChange={event => {
                handlePhone(event);
                setUserParams({
                  ...userParams,
                  telefone: event?.target?.value,
                });
              }}
            />
          </div>
          <div style={{ width: "49%" }}>
            <label>Data de nascimento:</label>
            <InputModal
              type="date"
              value={userParams?.nascimento}
              onChange={event =>
                setUserParams({
                  ...userParams,
                  nascimento: event?.target.value,
                })
              }
            />
          </div>
        </ModalRowFlex>
        <ModalRow>
          <label>Cidade onde nasceu:</label>
          <InputModal
            type="string"
            value={userParams?.cidade}
            onChange={event =>
              setUserParams({
                ...userParams,
                cidade: event?.target.value,
              })
            }
          />
        </ModalRow>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton onClick={() => setUserParams(emptyUserData)}>Limpar</ModalButton>
        <ModalButton onClick={() => handleUsersParams()}>Enviar</ModalButton>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;

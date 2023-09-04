import Modal from "react-bootstrap/Modal";
import { InputModal, ModalButton, ModalRow, ModalRowFlex } from "../Modal.styles";
import { handlePhone, phoneMask, validateEmail } from "../../../utils/functions";
import { UserInterface } from "../../Table/Table";
import moment from "moment";
import { useState, useEffect } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";

interface EditUserModal {
  isVisible: boolean;
  onClose: () => void;
  onSuccess: () => void;
  userData: UserInterface;
}

function EditUserModal({ isVisible, onClose, onSuccess, userData }: EditUserModal) {
  const [handleParams, setHandleParams] = useState<UserInterface>(userData);

  const emptyUserData: UserInterface = {
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    nascimento: "YYYY-MM-DD",
    cidade: "",
  };

  useEffect(() => {
    setHandleParams(userData);
  }, []);

  const handleUserData = async () => {
    if (!validateEmail(handleParams.email)) return toast.error("Formato de e-mail inválido.");

    try {
      await api.put(`usuarios/${userData.id}`, {
        ...handleParams,
      });

      toast.success("Usuário editado com sucesso!");
      onSuccess();
      onClose();
    } catch (e) {
      toast.error("Ops! Erro ao editar usuário.");
    }
  };

  return (
    <Modal show={isVisible} onHide={onClose} style={{ top: "5%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Editar</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ModalRow>
          <label>Nome:</label>
          <InputModal
            type="string"
            value={handleParams?.nome}
            onChange={event =>
              setHandleParams({
                ...handleParams,
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
            value={handleParams?.email}
            onChange={event =>
              setHandleParams({
                ...handleParams,
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
              onChange={event => {
                handlePhone(event);
                setHandleParams({
                  ...handleParams,
                  telefone: event?.target.value,
                });
              }}
              value={handleParams?.telefone ? phoneMask(handleParams?.telefone?.toString()) : ""}
            />
          </div>
          <div style={{ width: "49%" }}>
            <label>Data de nascimento:</label>
            <InputModal
              type="date"
              onChange={event =>
                setHandleParams({
                  ...handleParams,
                  nascimento: event?.target.value,
                })
              }
              value={moment(handleParams?.nascimento, "DD/MM/YYYY").format("YYYY-MM-DD")}
            />
          </div>
        </ModalRowFlex>
        <ModalRow>
          <label>Cidade onde nasceu:</label>
          <InputModal
            onChange={event =>
              setHandleParams({
                ...handleParams,
                cidade: event?.target.value,
              })
            }
            type="string"
            value={handleParams?.cidade}
          />
        </ModalRow>
      </Modal.Body>
      <Modal.Footer>
        <ModalButton onClick={() => setHandleParams(emptyUserData)}>Limpar</ModalButton>
        <ModalButton onClick={() => handleUserData()}>Enviar</ModalButton>
      </Modal.Footer>
    </Modal>
  );
}

export default EditUserModal;

import Modal from "react-bootstrap/Modal";
import { ModalButton } from "../Modal.styles";
import api from "../../../services/api";
import { toast } from "react-toastify";

interface ConfirmModal {
  isVisible: boolean;
  userId: number;
  onClose: () => void;
  onSuccess: () => void;
}

function ConfirmModal({ isVisible, onClose, onSuccess, userId }: ConfirmModal) {
  const handleRemoveUser = async () => {
    try {
      await api.delete(`/usuarios/${userId}`);

      toast.success("Usuário removido com sucesso.");
      onSuccess();
      onClose();
    } catch (e) {
      return toast.success("Ocorreu um erro ao remover o usuário.");
    }
  };

  return (
    <Modal show={isVisible} onHide={onClose} style={{ top: "5%" }}>
      <Modal.Header closeButton>
        <Modal.Title>Atenção</Modal.Title>
      </Modal.Header>
      <Modal.Body>Você tem certeza que deseja excluir esse contato?</Modal.Body>
      <Modal.Footer>
        <ModalButton onClick={onClose}>Cancelar</ModalButton>
        <ModalButton onClick={() => handleRemoveUser()}>Excluir</ModalButton>
      </Modal.Footer>
    </Modal>
  );
}

export default ConfirmModal;

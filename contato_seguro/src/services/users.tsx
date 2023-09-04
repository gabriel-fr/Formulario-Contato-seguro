import api from "./api";
import { toast } from "react-toastify";

export const handleUsersData = async () => {
  try {
    const response = await api.get(`/usuarios`);
    return response?.data || [];
  } catch (e) {
    toast.error("Ops, occorreu um erro.");
    return [];
  }
};

import { useState } from "react";
import Swal from "sweetalert2";

// Alerta reutilizable
export const Alertas = (title, text = "", icon = "warning") => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#4a7291",
  });
};

// Custom hook
export const useValidacionUser = ({ requiereConfirmacion = true } = {}) => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [confirma, setConfirma] = useState("");

  const validar = (e) => {
    e.preventDefault();

    if (!email.trim() || !contraseña.trim() || (requiereConfirmacion && !confirma.trim())) {
      Alertas("Todos los campos son obligatorios");
      return false;
    }

    if (contraseña.length < 6) {
      Alertas("Contraseña debe tener al menos 6 caracteres");
      return false;
    }

    if (!email.includes("@")) {
      Alertas("El campo email no tiene formato válido");
      return false;
    }

    if (requiereConfirmacion && contraseña !== confirma) {
      Alertas("Las contraseñas deben ser iguales");
      return false;
    }

    // Todo está bien
    return true;
  };

  return {
    email,
    setEmail,
    contraseña,
    setContraseña,
    confirma,
    setConfirma,
    validar
  };
};

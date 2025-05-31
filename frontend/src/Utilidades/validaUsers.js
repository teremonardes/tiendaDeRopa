import Swal from "sweetalert2";

//Estados del formulario

export const Alertas = (title, text, icon) => {
  Swal.fire({
    title,
    text,
    icon,
    confirmButtonColor: "#4a7291",
  });
};

export const [email, setEmail] = useState("");
export const [contraseña, setContraseña] = useState("");
export const [confirma, setConfirma] = useState("");

export const validaUsers = (e) => {
  e.preventDefault(); //Validación;
  if (!email.trim() || !contraseña.trim() || !confirma.trim()) {
    Swal.fire("Todos los campos son obligatorios");
    return;
  }

  if (contraseña.length < 6) {
    Swal.fire("Contraseña Debe tener al menos 6 caracteres");
    return;
  }
  if (!email.includes("@")) {
    Swal.fire(" Campo email No tiene formato de correo");
    return;
  }

  if (contraseña !== confirma) {
    Swal.fire("Contraseña Deben ser iguales");
    return;
  }
  Swal.fire(" LOGIN ESTA CORRECTO");
};

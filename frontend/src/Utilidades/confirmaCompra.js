const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-success",
    cancelButton: "btn btn-danger",
  },
  buttonsStyling: false,
});
swalWithBootstrapButtons
  .fire({
    title: "Estas seguro?",
    text: "No podras revertir decision!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Confirma Compra!",
    cancelButtonText: "No, Cancela Compra!",
    reverseButtons: true,
  })
  .then((result) => {
    if (result.isConfirmed) {
      swalWithBootstrapButtons.fire({
        title: "Efectuada!",
        text: "Tu compra ha sido realizada",
        icon: "success",
      });
    } else if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.cancel
    ) {
      swalWithBootstrapButtons.fire({
        title: "Cancelada",
        text: "Your compra se canceló)",
        icon: "error",
      });
    }
  });

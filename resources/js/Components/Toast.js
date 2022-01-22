import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    icon: "success",
    title: "General Title",
    position: "top-right",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});


export default Toast
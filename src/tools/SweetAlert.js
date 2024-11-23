import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const DeleteConfirm = Swal.mixin({
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#C72424",
  cancelButtonColor: "#301E5F",
  confirmButtonText: "確認刪除",
  cancelButtonText: '取消',
  reverseButtons: true
})


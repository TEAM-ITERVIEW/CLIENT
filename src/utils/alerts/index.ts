import Swal from "sweetalert2";
import {
  InterviewStartMessage,
  InterviewQuitMessage,
} from "@utils/constants/errorMessage";

let timerInterval: number;
export const autoStartInterview = (onClose: () => void) =>
  Swal.fire({
    title: InterviewStartMessage.title,
    html: InterviewStartMessage.html,
    allowOutsideClick: false,
    color: "var(--color-black-0)",
    background: "var(--color-black-90)",
    padding: "32px 32px 50px 32px",
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      const timer = Swal.getPopup()!.querySelector("b");
      timerInterval = window.setInterval(() => {
        if (timer)
          timer.textContent = `${Math.round(
            (Swal.getTimerLeft() as number) / 1000,
          )}`;
      }, 1000);
    },
    willClose: () => clearInterval(timerInterval),
  }).then(result => {
    if (result.dismiss === Swal.DismissReason.timer) onClose();
  });

export const confirmQuitInterview = (
  onConfirm: () => void,
  onCancel: () => void,
) =>
  Swal.fire({
    html: InterviewQuitMessage,
    icon: "warning",
    color: "var(--color-black-0)",
    background: "var(--color-black-90)",
    iconColor: "var(--color-theme-main)",
    confirmButtonColor: "var(--color-theme-main)",
    cancelButtonColor: "var(--color-black-50)",
    showCancelButton: true,
    confirmButtonText: "그래도 종료하기",
    cancelButtonText: "취소",
    reverseButtons: true,
    focusCancel: true,
  }).then(res => {
    if (res.isConfirmed) onConfirm();
    else onCancel();
  });
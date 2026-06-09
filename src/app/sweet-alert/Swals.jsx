import Swal from "sweetalert2";
const customClass = {
  popup: "bg-[#0b0b0b] text-white border border-[#d4af37] rounded-2xl",
  title: "text-[#f5d36b]",
  htmlContainer: "text-gray-300",
  confirmButton: "bg-[#d4af37] text-black font-semibold px-5 py-2 rounded-lg",
  cancelButton: "bg-[#2a2a2a] text-white font-semibold px-5 py-2 rounded-lg",
};

//NORMAL
export const sw_normal = (title = "Success", icon = "success", text = "") => {
  return Swal.fire({
    title,
    icon,
    text,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
  });
};

// SUCCESS
export const sw_success = (
  title = "Success",
  text = "Action completed successfully",
) => {
  return Swal.fire({
    title,
    icon: "success",
    text,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
  });
};

export const sw_error = (title = "Error", text = "Something went wrong") => {
  return Swal.fire({
    title,
    icon: "error",
    text,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
  });
};

export const sw_warning = (
  title = "Warning",
  text = "Please check all fields",
) => {
  return Swal.fire({
    title,
    icon: "warning",
    text,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
  });
};

export const sw_info = (title = "Information", text = "") => {
  return Swal.fire({
    title,
    icon: "info",
    text,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
  });
};

export const sw_confirm = (
  title = "Are you sure?",
  text = "You won't be able to revert this!",
  confirmButtonText = "Yes",
) => {
  return Swal.fire({
    title,
    icon: "question",
    text,
    showCancelButton: true,
    confirmButtonColor: "#d4af37",
    cancelButtonColor: "#2a2a2a",
    confirmButtonText,
    background: "#0b0b0b",
    color: "#ffffff",
    customClass,
  });
};

export const sw_server_error = (
  title = "Server Error",
  text = "Internal server error",
) => {
  return Swal.fire({
    title,
    icon: "error",
    text,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
  });
};

export const sw_loading = (title = "Please Wait...") => {
  Swal.fire({
    title,
    allowOutsideClick: false,
    background: "#0b0b0b",
    color: "#ffffff",
    confirmButtonColor: "#d4af37",
    customClass,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const sw_close = () => {
  Swal.close();
};

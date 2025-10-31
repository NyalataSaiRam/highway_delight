import axios from "axios";
import toast from "react-hot-toast";

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.error ?? "Something went wrong");
  } else {
    toast.error("Something went wrong");
  }
}

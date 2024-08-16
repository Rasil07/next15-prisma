import { toast } from "../ui/use-toast";

type ToastType = "success" | "error";

interface ShowToastOptions {
  type: ToastType;
  message: string;
}

export function showToast({ type, message }: ShowToastOptions) {
  const isSuccess = type === "success";

  toast({
    description: message,
    className: "p-0 rounded-lg shadow-lg",
    duration: 1200, // Customize the duration as needed
  });
}

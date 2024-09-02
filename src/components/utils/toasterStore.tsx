import { useStore } from "@nanostores/react";
import { atom } from "nanostores";

interface Toast {
  id: number;
  message: string;
}
const MAX_MESSAGE_LENGTH = 64;

const toastsAtom = atom<Toast[]>([]);

export const addToast = (message: string) => {
  const truncatedMessage =
    message.length > MAX_MESSAGE_LENGTH
      ? message.slice(0, MAX_MESSAGE_LENGTH) + "..."
      : message;
  toastsAtom.set([...toastsAtom.get(), { id: Date.now(), message: truncatedMessage }]);
};

export const removeToast = (id: number) => {
  toastsAtom.set(toastsAtom.get().filter((toast) => toast.id !== id));
};

export const useToasts = () => {
  return useStore(toastsAtom);
};

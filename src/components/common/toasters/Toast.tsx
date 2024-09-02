import { useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { removeToast, useToasts } from '../../utils/toasterStore';

const Toast = () => {
  const toasts = useToasts();
  const displayedToastIds = useRef<Set<number>>(new Set());

  useEffect(() => {
    toasts.forEach(({ id, message }) => {
      if (!displayedToastIds.current.has(id)) {
        displayedToastIds.current.add(id);
        toast(message, {
          onClose: () => {
            removeToast(id);
            displayedToastIds.current.delete(id);
          },
        });
      }
    });
  }, [toasts]);

  return <ToastContainer />;
};

export default Toast;

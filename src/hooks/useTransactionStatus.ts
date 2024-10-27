import { useCallback, useEffect, useRef, useState } from "react";
import { checkTrxStatus } from "./useBilling";

interface UseTransactionStatusProps {
  trx?: string;
  initialInterval?: number;
}

interface UseTransactionStatusResult {
  status: string;
  isPolling: boolean;
  error: string | null;
  response: string | null;
  stopPolling: () => void;
  startPolling: () => void;
}

export const useTransactionStatus = ({
  trx,
  initialInterval = 2000,
}: UseTransactionStatusProps): UseTransactionStatusResult => {
  const [status, setStatus] = useState<string>('PENDING');
  const [isPolling, setIsPolling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const attemptCount = useRef(0);
  const currentInterval = useRef(initialInterval);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const stopPolling = useCallback(() => {
    setIsPolling(false);
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
      timeoutId.current = null;
    }
  }, []);

  const poll = useCallback(async () => {
    if (!trx || attemptCount.current >= 120) return;

    attemptCount.current += 1;
    console.log("calling trx " + trx);

    const data = await checkTrxStatus(trx);
    
    if (data && data.status) {
      if (data.status !== status) {
        setStatus(data.status);
      }
      if (data.response && data.response !== response) {
        setResponse(data.response);
      }

      // Set timeout for the next poll if we haven't exceeded attempts
      if (attemptCount.current < 2) {
        timeoutId.current = setTimeout(poll, currentInterval.current);
      } else {
        stopPolling();
      }
    } else {
      stopPolling();
      setError('Failed to get transaction status');
    }
  }, [trx, isPolling, status, response, stopPolling]);

  const startPolling = useCallback(() => {
    if (!trx || isPolling) return;

    attemptCount.current = 0;
    setError(null);
    setIsPolling(true);
    
    poll();
  }, [trx, isPolling, poll]);

  return {
    status,
    isPolling,
    error,
    response,
    stopPolling,
    startPolling
  };
};

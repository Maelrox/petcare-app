import { useCallback, useEffect, useState } from "react";
import { checkTrxStatus } from "./useBilling";

export const useBillingCheckTrxStatus = (trx?: string) => {
    const [status, setStatus] = useState<String>('PENDING');
    const [isPolling, setIsPolling] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [response, setResponse] = useState<string | null>(null);

    const checkStatus = useCallback(async () => {
        if (!trx) return;

        try {
            const data = await checkTrxStatus(trx);
            if (data) {
                if (data.response) {
                    setResponse(data.response);
                    setStatus(data.status ? data.status : "")
                }
                return data.status;
            }
        } catch (err) {
            setError('Failed to check transaction status');
            return 'FAILED' as string;
        }
    }, [trx]);

    const startPolling = useCallback(async () => {
        if (!trx || isPolling) return;

        setIsPolling(true);
        let currentStatus = 'PENDING';

        while (currentStatus === 'PENDING' || currentStatus === 'PROCESSING') {
            await new Promise(resolve => setTimeout(resolve, 2000)); // Poll every 2 seconds
            currentStatus = await checkStatus() || 'FAILED';
            
            if (currentStatus === 'COMPLETED' || currentStatus === 'FAILED') {
                break;
            }
        }

        setIsPolling(false);
    }, [trx, isPolling, checkStatus]);

    const stopPolling = useCallback(() => {
        setIsPolling(false);
    }, []);

    useEffect(() => {
        if (trx) {
            startPolling();
        }

        return () => {
            stopPolling();
        };
    }, [trx, startPolling, stopPolling]);

    return { status, isPolling, error, response, stopPolling };
};

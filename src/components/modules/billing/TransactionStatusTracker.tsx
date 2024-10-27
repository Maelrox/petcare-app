import React from 'react';
import { useBillingCheckTrxStatus } from '../../../hooks/useBillingCheckTrxStatus';

export type TransactionStatus = 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED';

interface TransactionStatusTrackerProps {
    trx: string;
    onClose: () => void;
}

const TransactionStatusTracker: React.FC<TransactionStatusTrackerProps> = ({
    trx,
    onClose
}) => {
    const { status, isPolling, error, response, stopPolling } = useBillingCheckTrxStatus(trx);

    const getStatusColor = () => {
        switch (status) {
            case 'COMPLETED':
                return 'bg-green-500';
            case 'FAILED':
                return 'bg-red-500';
            case 'PROCESSING':
                return 'bg-blue-500';
            default:
                return 'bg-yellow-500';
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to stop tracking this transaction? You might not be able to see the final status.')) {
            stopPolling();
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-gray-900">Transaction Status</h3>
                        <button
                            onClick={handleCancel}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Transaction ID */}
                        <div className="bg-gray-50 rounded-lg p-4">
                            <div className="text-sm text-gray-500 mb-1">Transaction ID</div>
                            <div className="font-mono text-sm">{trx}</div>
                        </div>

                        {/* Status Indicator */}
                        <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor()}`}>
                                {isPolling && status !== 'COMPLETED' && status !== 'FAILED' && (
                                    <div className="animate-ping w-3 h-3 rounded-full bg-blue-400 opacity-75"></div>
                                )}
                            </div>
                            <div className="text-lg font-medium">{status}</div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className={`h-full transition-all duration-500 ${getStatusColor()}`}
                                style={{
                                    width: status === 'COMPLETED' ? '100%' : 
                                           status === 'FAILED' ? '100%' :
                                           status === 'PROCESSING' ? '66%' : '33%'
                                }}
                            />
                        </div>

                        {/* Status Message */}
                        {response && (
                            <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-sm text-gray-600">{response}</div>
                            </div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 text-red-600 rounded-lg p-4 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-3">
                            {(status === 'COMPLETED' || status === 'FAILED') ? (
                                <button
                                    onClick={onClose}
                                    className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
                                >
                                    Close
                                </button>
                            ) : (
                                <button
                                    onClick={handleCancel}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel Tracking
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionStatusTracker;
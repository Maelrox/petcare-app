import { Trash2 } from "lucide-react";
import type { BillingDetail } from "../../../types/BilllingDetailType";


interface BillingItemCardProps {
    handleRemoveItem: (index:number) => void;
    handleQuantityChange: (index:number, quantity:number) => void;
    item: BillingDetail;
    index: number;
}

export const BillingItemCard: React.FC<BillingItemCardProps> = ({
    handleRemoveItem,
    handleQuantityChange,
    item,
    index
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
            <div className="flex justify-between items-start mb-2">
                <div className="font-medium">{item.name}</div>
                <button
                    className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                    onClick={() => handleRemoveItem(index)}
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
            <div className="text-sm text-gray-600 mb-2">{item.description}</div>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <label className="text-sm">Qty:</label>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                        className="w-20 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="text-right">
                    <div className="text-sm text-gray-600">Price: ${item.amount.toFixed(2)}</div>
                    <div className="font-medium">Subtotal: ${(item.quantity * item.amount).toFixed(2)}</div>
                </div>
            </div>
        </div>
    )
};
import { Trash2 } from "lucide-react";
import type { BillingDetail } from "../../../types/BilllingDetailType";

interface BillingItemTableProps {
    handleRemoveItem: (index:number) => void;
    handleQuantityChange: (index:number, quantity:number) => void;
    handlePriceChange: (index:number, price:number) => void;
    items: BillingDetail[];
}


export const BillingItemTable: React.FC<BillingItemTableProps> = ({
    handleRemoveItem,
    handleQuantityChange,
    handlePriceChange,
    items,
}) => {
    return (
    <table className="w-full">
        <thead>
            <tr className="bg-gray-100">
                <th className="text-left p-4">Item</th>
                <th className="text-left p-4">Description</th>
                <th className="text-left p-4 w-24">Quantity</th>
                <th className="text-left p-4 w-24">Price</th>
                <th className="text-left p-4 w-24">Subtotal</th>
                <th className="w-16"></th>
            </tr>
        </thead>
        <tbody>
            {items.map((item, index) => (
                <tr key={index} className="border-b">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.description}</td>
                    <td className="p-4">
                        <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                            className="w-20 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </td>
                    <td className="p-4"> <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={item.amount}
                        onChange={(e) => handlePriceChange(index, parseFloat(e.target.value) || 0)}
                        className="w-24 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    /></td>
                    <td className="p-4">${(item.quantity * item.amount).toFixed(2)}</td>
                    <td className="p-4">
                        <button
                            className="p-2 text-red-500 hover:text-red-700 rounded-full hover:bg-red-50"
                            onClick={() => handleRemoveItem(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
)};
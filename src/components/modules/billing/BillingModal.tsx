import React, { useState, useEffect } from 'react';
import { Plus, Receipt, User } from "lucide-react";
import type { Billing } from '../../../types/BillingType';
import type { BillingDetail } from '../../../types/BilllingDetailType';
import { fetchUnBilledAttentions } from '../../../hooks/modules/useConsult';
import Owners from '../owner/Owners';
import type { Owner } from '../../../types/OwnerType';
import Inventories from '../inventory/Inventories';
import type { Inventory } from '../../../types/InventoryType';
import { BillingItemCard } from './BillingItemCard';
import { BillingItemTable } from './BillingItemTable';

interface BillingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Billing) => Promise<boolean | undefined>;
    initialData?: Billing | null;
}

const BillingPOSModal: React.FC<BillingModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    initialData
}) => {
    const [selectedOwner, setSelectedOwner] = useState<Owner | null>(null);
    const [items, setItems] = useState<BillingDetail[]>([]);
    const [total, setTotal] = useState(0);
    const [isOwnerSelectOpen, setIsOwnerSelectOpen] = useState(false);
    const [isInventorySearchOpen, setIsInventorySearchOpen] = useState(false);

    useEffect(() => {
        if (selectedOwner) {
            loadUnbilledConsultations(selectedOwner.ownerId);
        }
    }, [selectedOwner]);

    if (!isOpen) return null;

    const loadUnbilledConsultations = async (ownerId: number) => {
        try {
            const consultations = await fetchUnBilledAttentions(ownerId);
            if (consultations) {
                const billingItems: BillingDetail[] = consultations.map(consult => ({
                    consultationId: consult.consultationId || 0,
                    name: `${consult.serviceName}`,
                    description: `Date: ${new Date(consult.consultationDate).toLocaleDateString()}`,
                    quantity: 1,
                    amount: consult.price || 0
                }));
                setItems(billingItems);
                calculateTotal(billingItems);
            }
        } catch (error) {
            console.error('Error loading consultations:', error);
        }
    };

    const calculateTotal = (currentItems: BillingDetail[]) => {
        const newTotal = currentItems.reduce((sum, item) => sum + (item.quantity * item.amount), 0);
        setTotal(newTotal);
    };

    const handleSubmit = async () => {
        if (!selectedOwner) {
            alert('Please select an owner first');
            return;
        }

        const billingData: Billing = {
            ownerId: selectedOwner.ownerId,
            owner: {
                ownerId: selectedOwner.ownerId
            },
            totalAmount: total,
            transactionDate: new Date().toISOString(),
            paymentStatus: "PENDING",
            billingId: initialData?.billingId || 0,
            transactionType: "CONSULTATION",
            billingDetails: items,
        };

        const response = await onSubmit(billingData);
        if (response) {
            onClose();
        }
    };

    const handleOwnerSelect = (owner: Owner) => {
        setSelectedOwner(owner);
        setIsOwnerSelectOpen(false);
    };

    const handleInventorySelect = (inventory: Inventory) => {
        const newBillingDetail: BillingDetail = {
            inventoryId: inventory.inventoryId,
            name: inventory.name,
            description: inventory.description || '',
            quantity: 1,
            amount: inventory.price || 0,
        };

        const existingItemIndex = items.findIndex(item => item.inventoryId === inventory.inventoryId);

        let updatedItems: BillingDetail[];
        if (existingItemIndex >= 0) {
            updatedItems = items.map((item, index) => {
                if (index === existingItemIndex) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    };
                }
                return item;
            });
        } else {
            updatedItems = [...items, newBillingDetail];
        }

        setItems(updatedItems);
        calculateTotal(updatedItems);
        setIsInventorySearchOpen(false);
    };

    const handleQuantityChange = (index: number, newQuantity: number) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity: newQuantity
                };
            }
            return item;
        });
        setItems(updatedItems);
        calculateTotal(updatedItems);
    };

    const handleRemoveItem = (index: number) => {
        const updatedItems = items.filter((_, i) => i !== index);
        setItems(updatedItems);
        calculateTotal(updatedItems);
    };

    const handlePriceChange = (index: number, newPrice: number) => {
        const updatedItems = items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    amount: newPrice
                };
            }
            return item;
        });
        setItems(updatedItems);
        calculateTotal(updatedItems);
    };



    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                <div className="p-4 md:p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-color_brand">New Bill</h2>
                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="mb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-4">
                            <div className="w-full">
                                <label className="block text-sm text-color_brand font-medium mb-2">Owner</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={selectedOwner ? selectedOwner.name : ''}
                                        placeholder="Select owner..."
                                        readOnly
                                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={() => setIsOwnerSelectOpen(true)}
                                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2 whitespace-nowrap"
                                    >
                                        <User className="w-4 h-4" />
                                        <span className="hidden md:inline">Search Owner</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Items Section */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold text-color_brand">Items</h3>
                            <button
                                onClick={() => setIsInventorySearchOpen(true)}
                                disabled={!selectedOwner}
                                className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-color_brand disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <Plus className="w-4 h-4" />
                                <span className="hidden md:inline">Add Item</span>
                            </button>
                        </div>

                        {/* Mobile: Cards */}
                        <div className="md:hidden space-y-4">
                            {items.map((item, index) => (
                                <BillingItemCard
                                    key={index}
                                    item={item}
                                    index={index}
                                    handleRemoveItem={handleRemoveItem}
                                    handleQuantityChange={handleQuantityChange} />
                            ))}
                        </div>

                        {/* Desktop: Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <BillingItemTable 
                                handleRemoveItem={handleRemoveItem}
                                handleQuantityChange={handleQuantityChange}
                                handlePriceChange={handlePriceChange} 
                                items={items} />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6">
                        <div className="text-xl md:text-2xl text-color_brand font-bold w-full md:w-auto text-center md:text-left">
                            Total: ${total.toFixed(2)}
                        </div>

                        <div className="flex gap-2 w-full md:w-auto">
                            <button
                                onClick={onClose}
                                className="flex-1 md:flex-none px-4 py-2 border rounded-lg hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedOwner || items.length === 0}
                                className="flex-1 md:flex-none px-4 py-2 bg-color_brand text-white rounded-lg hover:bg-rose-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                <Receipt className="w-4 h-4" /> Bill
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Owner Selection Modal */}
            {isOwnerSelectOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Select Owner</h3>
                                <button
                                    onClick={() => setIsOwnerSelectOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <Owners handleSelect={handleOwnerSelect} />
                        </div>
                    </div>
                </div>
            )}

            {/* Inventory Selection Modal */}
            {isInventorySearchOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Select Inventory</h3>
                                <button
                                    onClick={() => setIsInventorySearchOpen(false)}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                            <Inventories handleSelect={handleInventorySelect} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillingPOSModal;
import React, { useEffect, useState } from "react";
import managementIcon from '../../assets/icons/company.png';
import catIcon from '../../assets/icons/cat.png';
import vetIcon from '../../assets/icons/vet.png';
import billIcon from '../../assets/icons/bill.png';
import checkListIcon from '../../assets/icons/checklist.png';

const menuItems = [
    { name: "Appointments", icon: catIcon.src, path: "/modules/appointment/", permission: "View" },
    { name: "Management", icon: managementIcon.src, path: "/modules/management/", permission: "System Manager" },
    { name: "Consults", icon: vetIcon.src, path: "/modules/consult/", permission: "View" },
    { name: "Inventory", icon: checkListIcon.src, path: "/modules/inventory/", permission: "View" },
    { name: "Bills", icon: billIcon.src, path: "/modules/billing/", permission: "View" },
];

const Menu = ({ permissions }) => {
    return (
        <nav className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-1 md:gap-4 item mt-4 sm:mt-0 items-center text-center">
                {menuItems.map(item => {
                    const hasPermission = permissions.some(role =>
                        role.permissions.some(permission =>
                            permission.name === item.permission
                        )
                    );

                    return (
                        hasPermission && (
                            <a key={item.name} href={item.path} className="flex items-center text-gray-600 hover:bg-slate-100 px-2 md:px-4 py-3 rounded-lg transition-colors">
                                <img src={item.icon} alt={item.name} className="w-12 h-12 mr-4" />
                                <span className="text-xs md:text-sm font-semibold">{item.name}</span>
                            </a>
                        )
                    );
                })}
            </div>
        </nav>
    );
};
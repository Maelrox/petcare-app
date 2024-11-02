import React, { useEffect, useState } from "react";
import Button from "../../common/buttons/Button";
import type { Permission, Role } from "../../../types/AuthTypes";
import { getAllRoles, updatePermissionRole } from "../../../hooks/useManager";
import type { PermissionRoles } from "../../../types/RequestType";
import { addToast } from "../../utils/toasterStore";

interface PermissionsFormProps {
  permission: Permission;
}

function PermissionRolesForm({ permission }: PermissionsFormProps) {
  const [roles, setRoles] = useState<Role[] | undefined>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const fetchedRoles = await getAllRoles();
        setRoles(fetchedRoles);
        const assignedRoles = fetchedRoles?.filter((role: Role) =>
          role.permissions?.some((perm) => perm.id === permission.id)
        );
        if (assignedRoles) {
          setSelectedRoles(assignedRoles);
        }
      } catch (error) {
        console.error("Failed to fetch roles:", error);
      }
    };

    fetchRoles();
  }, [permission.id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectRole = (role: Role) => {
    if (!selectedRoles.some((selectedRole) => selectedRole.id === role.id)) {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleRemoveRole = (roleId: number) => {
    setSelectedRoles(selectedRoles.filter((role) => role.id !== roleId));
  };

  const filteredRoles = roles?.filter((role) =>
    role.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const permissionRoles: PermissionRoles = {
      ...permission,
      roles: selectedRoles,
    };
    try {
      await updatePermissionRole(permissionRoles);
      addToast("Roles assigned successfully!");
    } catch (error) {
      console.error("Failed to submit roles:", error);
      addToast("Failed to assign roles " + error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search roles"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-color_brand font-semibold">Available Roles</h3>
        <ul className="border border-brand rounded p-2 max-h-48 min-h-48 overflow-y-auto">
          {filteredRoles &&
            filteredRoles.map((role) => (
              <li
                key={role.id}
                className="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelectRole(role)}
              >
                {role.name}
              </li>
            ))}
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Selected Roles</h3>
        <ul className="border border-gray-300 rounded p-2 max-h-32 min-h-32 overflow-y-auto scroll-m-">
          {selectedRoles.map((role) => (
            <li
              key={role.id}
              className="p-2 border-b border-gray-200 flex justify-between items-center"
            >
              <span>{role.name}</span>
              <button
                type="button"
                className="text-red-500 hover:text-red-700"
                onClick={() => handleRemoveRole(role.id!)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Button type="submit">Save configuration</Button>
    </form>
  );
}

export default PermissionRolesForm;

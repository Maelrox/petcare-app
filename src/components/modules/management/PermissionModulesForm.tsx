import React, { useEffect, useState } from "react";
import Button from "../../common/buttons/Button";
import type { Module, Permission, PermissionModules } from "../../../types/AuthTypes";
import { getAllModules, getModuleActions, updatePermissionActionsModule } from "../../../hooks/useManager";
import { addToast } from "../../utils/toasterStore";
import '../../../styles/Checkbox.css';

interface PermissionsFormProps {
  permission: Permission;
}

function PermissionModulesForm({ permission }: PermissionsFormProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const fetchedModules = await getAllModules();
        const initializedModules = fetchedModules?.map((module) => ({
          ...module,
          modulesActions: module.modulesActions.map((action) => ({
            ...action,
            selected: action.selected ?? false,
          })),
        }));
        if (initializedModules) {
          setModules(initializedModules);
        }
      } catch (error) {
        console.error("Failed to fetch modules:", error);
      }
    };
    fetchModules();
  }, [permission.id]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSelectModule = async (module: Module) => {
    setSelectedModule(module);
    await checkModuleActions(module);
  };

  const checkModuleActions = async (module: Module) => {
    try {
      const permissionActions = await getModuleActions(permission.id!, module.id);

      if (!permissionActions) {
        console.error("No permission actions returned from getModuleActions");
        return;
      }

      const updatedModuleActions = module.modulesActions.map((action) => ({
        ...action,
        selected: permissionActions.some((pa) => pa.id === action.id),
      }));


      setSelectedModule({
        ...module,
        modulesActions: updatedModuleActions,
      });
    } catch (error) {
      console.error("Failed to fetch module actions:", error);
      addToast("Failed to update action: " + error);
    }
  };

  const handleActionChange = (moduleId: number, actionId: number, checked: boolean) => {
    if (selectedModule && selectedModule.id === moduleId) {
      setSelectedModule({
        ...selectedModule,
        modulesActions: selectedModule.modulesActions.map((action) =>
          action.id === actionId ? { ...action, selected: checked } : action
        ),
      });
    }
  };

  const filteredModules = modules.filter((module) =>
    module.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedModule) {
      try {
        const permissionModuleActions: PermissionModules = {
          id: permission.id,
          moduleId: selectedModule.id.toString(),
          name: permission.name,
          modulesAction: selectedModule.modulesActions.filter((action) => action.selected),
        };
        await updatePermissionActionsModule(permissionModuleActions);
        addToast("Roles assigned successfully!");
      } catch (error) {
        console.error("Failed to submit roles:", error);
        addToast("Failed to assign roles " + error);
      }
    } else {
      addToast("Please select a module before submitting.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search modules"
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <h3 className="text-color_brand font-semibold">Available Modules</h3>
        <ul className="border border-brand rounded p-2 max-h-48 min-h-48 overflow-y-auto">
          {filteredModules.map((module) => (
            <li
              key={module.id}
              className={`p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100 ${
                selectedModule?.id === module.id ? 'bg-blue-100' : ''
              }`}
              onClick={() => handleSelectModule(module)}
            >
              {module.name}
            </li>
          ))}
        </ul>
      </div>
      {selectedModule ? (
        <div className="mb-4">
          <ul>
            {selectedModule.modulesActions.map((action) => (
              <li key={action.id} className="flex items-center m-4">
                <input
                  className={`custom-checkbox ${action.selected ? 'custom-checkbox-checked' : ''}`}
                  type="checkbox"
                  id={`action-${action.id}`}
                  checked={action.selected || false}
                  onChange={(e) => handleActionChange(selectedModule.id, action.id, e.target.checked)}
                />
                <label htmlFor={`action-${action.id}`} className="ml-2">
                  {action.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="min-h-12">Select a module to start editing actions</div>
      )}
      <Button type="submit">Save configuration</Button>
    </form>
  );
}

export default PermissionModulesForm;

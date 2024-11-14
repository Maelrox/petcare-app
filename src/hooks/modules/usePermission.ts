import { useState, useEffect, useCallback } from "react";
import type { UserDetails, Action } from "../../types/AuthTypes";

const usePermission = () => {
  const [userData, setUserData] = useState<UserDetails | null>(null);
  useEffect(() => {
    try {
      const storedData = sessionStorage.getItem("userData");
      if (storedData) {
        setUserData(JSON.parse(storedData)?.userDetails);
      }
    } catch (error) {
      console.error("Error accessing sessionStorage:", error);
    }
  }, []);

  const hasPermission = useCallback(
    (module: string, action: string) => {
      if (!userData?.actions) return false;
      const normalizedModule = module.toLowerCase().trim();
      const normalizedAction = action.toLowerCase().trim();

      return userData.actions.some(
        (userAction) =>
          userAction.module.name.toLowerCase() === normalizedModule &&
          userAction.name.toLowerCase() === normalizedAction
      );
    },
    [userData]
  );

  const isActionAllowed = (module: string, actionName: String) => {
    if (!userData) return false;
    return userData.actions.some(action =>
      action.module &&
      action.module.name.toLowerCase().trim() === module &&
      action.name.toLowerCase().trim() === actionName
    );
  }
  
  const getModuleActions = (module: string, actions: Action[]): Action[] => {
    return actions.filter(action => 
      action.module &&
      action.module.name.toLowerCase().trim() === module.toLowerCase().trim()
    );
  };
  
  const hasAnyActionInModule = (modules: string[]): boolean => {
    if (!userData) return false;
    return modules.some(module => getModuleActions(module, userData.actions).length > 0);
  };

  return { hasPermission, hasAnyActionInModule, isActionAllowed };
};

export default usePermission;

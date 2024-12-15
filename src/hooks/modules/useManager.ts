import { generateRequestOptions, buildPaginatedUrl } from "../../components/utils/httpHandler";
import type { Module, Role, Permission, PermissionModules, ModuleAction, IdentificationType } from "../../types/AuthTypes";
import type { PaginationParams, PaginatedResponse, PermissionRoles } from "../../types/RequestType";
import { blankPaginatedResponse, type TransactionResponse } from "../../types/ResponseType";
import { useFetchData } from "../api/useFetchData";

const BASE_URL = import.meta.env.PUBLIC_VITE_BACKEND_URL;
const PATH_ROLE = "/management/role"
const PATH_PERMISSION = "/management/permission"
const PATH_MODULE = "/management/module"
const PATH_USER = "/management/user"
const PATH_PERMISSION_MODULE_ACTIONS = "/management/permission/module-actions"

export const getAllModules = async (): Promise<Module[] | undefined> => {
  const options = generateRequestOptions("GET")
  const url = BASE_URL + PATH_MODULE + "/all"
  if (options) {
    return await useFetchData<Module[]>(url, options)
  }
};

export const getAllRoles = async (): Promise<Role[] | undefined> => {
  const options = generateRequestOptions("GET")
  const url = BASE_URL + PATH_ROLE + "/all"
  if (options) {
    return await useFetchData<Role[]>(url, options)
  }
};

export const getRoles = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Role>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_ROLE, pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Role>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createRole = async (role: Role): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", role)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_ROLE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updateRole = async (role: Role): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", role)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_ROLE, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deleteRole = async (id: number): Promise<string | undefined> => {
  const options = generateRequestOptions("DELETE")
  if (options) {
    const url = `${BASE_URL}${PATH_ROLE}/${id}`
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const getPermissions = async (
  queryParams: string,
  pagination: PaginationParams
): Promise<PaginatedResponse<Permission>> => {
  const options = generateRequestOptions("GET")
  const url = buildPaginatedUrl(BASE_URL + PATH_PERMISSION, pagination, queryParams)
  if (options && url) {
    const response = await useFetchData<PaginatedResponse<Role>>(url, options)
    return response? response : blankPaginatedResponse
  } else {
    return blankPaginatedResponse
  }
};

export const createPermission = async (permission: Permission): Promise<string | undefined> => {
  const options = generateRequestOptions("POST", permission)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_PERMISSION, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updatePermission = async (role: Permission): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", role)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_PERMISSION, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const deletePermission = async (id: number): Promise<string | undefined> => {
  const options = generateRequestOptions("DELETE")
  if (options) {
    const url = `${BASE_URL}${PATH_PERMISSION}/${id}`
    const response = await useFetchData<TransactionResponse>(url, options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updatePermissionRole = async (permissionRoles: PermissionRoles): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", permissionRoles)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_PERMISSION + "/role", options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const updatePermissionActionsModule = async (permissionRoles: PermissionModules): Promise<string | undefined> => {
  const options = generateRequestOptions("PUT", permissionRoles)
  if (options) {
    const response = await useFetchData<TransactionResponse>(BASE_URL + PATH_PERMISSION + "/module", options)
    return response?.message ? response.message : undefined
  } else {
    return undefined
  }
};

export const getModuleActions = async (permissionId: number, moduleId: number): Promise<ModuleAction[] | undefined> => {
  const options = generateRequestOptions("GET")
  if (options) {
    const url = `${BASE_URL}${PATH_PERMISSION_MODULE_ACTIONS}/${permissionId}/${moduleId}`
    const response = await useFetchData<ModuleAction[]>(url, options)
    return response? response : undefined
  } else {
    return undefined
  }
};

export const fetchIdentificationTypes = async (): Promise<IdentificationType[] | undefined> => {
  const options = generateRequestOptions("GET")
  let url = BASE_URL + PATH_USER + "/identificationTypes"
  if (options) {
    return await useFetchData<IdentificationType[]>(url, options)
  }
};

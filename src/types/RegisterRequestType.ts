export interface RegisterRequest {
  id?: number;
  username: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  country: string;
  roles: string[];
  token: string;
  company?: Company;
}

export interface Company {
  name: string,
  companyIdentification: string,
  country: string
}
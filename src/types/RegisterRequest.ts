export interface RegisterRequest {
  userName: string;
  name: string;
  password: string;
  email: string;
  phone: string;
  country: string;
  roles: string[];
  token: string;
  company: Company;
}

export interface Company {
  "name": string, //255 Max 
  "companyIdentification": string, //100 Max
  "country": string //Code Country 2 Chars Max
}
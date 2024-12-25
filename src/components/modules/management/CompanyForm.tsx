import React, { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import ButtonIcon from '../../common/buttons/ButtonIcon';
import { SaveIcon } from 'lucide-react';
import { updateCompany, fetchCompanyData } from '../../../hooks/modules/useCompany';
import CountrySelect from '../../common/select/CountrySelect';
import { addToast } from '../../utils/toasterStore';

export interface Company {
  country: string;
  companyIdentification: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

const initialCompanyState: Company = {
  country: '',
  companyIdentification: '',
  name: '',
  email: '',
  phone: '',
  address: ''
};

const CompanyForm: React.FC = () => {
  const [company, setCompany] = useState<Company>(initialCompanyState);

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    const companyData = await fetchCompanyData();
    if (!companyData) {
      addToast('No company data received');
      return;
    }
    setCompany(companyData);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCompany((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCountryChange = (value: string) => {
    setCompany((prevState) => ({
      ...prevState,
      country: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const responseMessage = await updateCompany(company);
    if (responseMessage) {
      addToast(responseMessage);
      await loadCompanyData();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-12 h-full w-full">
      <h1 className="text-2xl text-color_brand font-bold mb-4">Company Info</h1>
      <h3 className="text-gray-600">
        Update your company info
      </h3>
      
      <div>
        <label htmlFor="country" className="block text-color_brand text-sm font-bold mb-2">
          Country
        </label>
        <div className="max-w-64">
          <CountrySelect
            value={company.country}
            onChange={handleCountryChange}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="companyIdentification" className="block text-color_brand text-sm font-bold mb-2">
          Identification
        </label>
        <input
          type="text"
          id="companyIdentification"
          name="companyIdentification"
          value={company.companyIdentification}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-color_brand mb-3 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="name" className="block text-color_brand text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={company.name}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-color_brand mb-3 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-color_brand text-sm font-bold mb-2">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={company.phone}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-color_brand mb-3 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-color_brand text-sm font-bold mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={company.address}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-color_brand mb-3 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-50"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-color_brand text-sm font-bold mb-2">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          value={company.email}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-color_brand mb-3 leading-tight focus:outline-none focus:shadow-outline disabled:opacity-50"
        />
      </div>

      <div>
        <ButtonIcon
          text="Save"
          type="submit"
        >
          <SaveIcon size={24} />
        </ButtonIcon>
      </div>
    </form>
  );
};

export default CompanyForm;
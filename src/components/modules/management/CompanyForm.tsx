import React, { useState, useEffect } from 'react';
import type { FormEvent, ChangeEvent } from 'react';
import ButtonIcon from '../../common/buttons/ButtonIcon';
import { SaveIcon } from 'lucide-react';
import type { Company } from '../../../types/RegisterRequestType';
import { updateCompany, fetchCompanyData } from '../../../hooks/useCompany';
import CountrySelect from '../../common/select/CountrySelect';

interface FormData {
  country: string;
  companyIdentification: string;
  name: string;
}

const CompanyAdminForm: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    country: '',
    companyIdentification: '',
    name: ''
  });

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const company = await fetchCompanyData();
      if (!company) {
        throw new Error('No company data received');
      }
      setFormData({
        country: company.country || '',
        companyIdentification: company.companyIdentification || '',
        name: company.name || ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load company data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prevState => ({ ...prevState, country: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const companyData: Company = {
        ...formData
      };
      const responseMessage = await updateCompany(companyData);
      if (responseMessage) {
        setSuccessMessage(responseMessage);
        await loadCompanyData();
      }
    } catch (err) {
      setError('Failed to update company information');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div className="p-12">Loading company information...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-12 h-full w-full">
      <h1 className="text-2xl text-color_brand font-bold mb-4">Company Info</h1>

      {error && (
        <p className="text-rose-600">{error}</p>
      )}

      {successMessage && (
        <p className="text-color_brand">{successMessage}</p>
      )}

      <h3 className="text-gray-600">
        Update your company info
      </h3>

      <div>
        <label htmlFor="country" className="block text-color_brand text-sm font-bold mb-2">
          Country
        </label>
        <div className="max-w-64">
          <CountrySelect
            value={formData.country}
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
          value={formData.companyIdentification}
          onChange={handleInputChange}
          disabled={isLoading}
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
          value={formData.name}
          onChange={handleInputChange}
          disabled={isLoading}
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

export default CompanyAdminForm;
import React, { useState } from 'react';
import type { FormEvent, ChangeEvent} from 'react';

interface FormData {
  country: string;
  companyIdentification: string;
  name: string;
}

const CompanyAdminForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    country: '',
    companyIdentification: '',
    name: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-12 h-full w-full">
      	<h1 className="text-2xl text-coral font-bold mb-4">Company Admin</h1>

        <h3>
          Register or update your company
        </h3>
        <div>
            <label htmlFor="country" className="block text-skyblue_dark text-sm font-bold mb-2">
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

        <div>
            <label htmlFor="companyIdentification" className="block max-w-64 text-skyblue_dark text-sm font-bold mb-2">
              Company Identification
            </label>
            <input
              type="text"
              id="companyIdentification"
              name="companyIdentification"
              value={formData.companyIdentification}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-skyblue_dark mb-3 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>

      <div>
        <label htmlFor="name" className="block text-skyblue_dark text-sm font-bold mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="shadow appearance-none border rounded w-full max-w-64 py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div>
        <button type="submit" className="bg-coral hover:bg-orange text-white font-bold py-2 px-4 rounded">
          Save
        </button>
      </div>
    </form>
  );
};

export default CompanyAdminForm;
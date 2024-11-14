import React, { useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { register } from '../../../hooks/modules/useAuth';
import type { RegisterRequest } from '../../../types/RegisterRequestType';
import CountrySelect from '../../common/select/CountrySelect';
import ButtonIcon from '../../common/buttons/ButtonIcon';
import { BanIcon, PlusIcon } from 'lucide-react';

interface FormData {
    userName: string;
    name: string;
    password: string;
    email: string;
    phone: string;
    country: string;
    company: {
        name: string;
        companyIdentification: string;
        country: string;
    };
}

interface FormErrors {
    userName?: string;
    name?: string;
    password?: string;
    email?: string;
    phone?: string;
    companyName?: string;
    companyIdentification?: string;
    companyCountry?: string;
}

interface RegisterModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({
    isOpen,
    onClose
}) => {
    const [formData, setFormData] = useState<FormData>({
        userName: '',
        name: '',
        password: '',
        email: '',
        phone: '',
        country: '',
        company: {
            name: '',
            companyIdentification: '',
            country: ''
        }
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const { executeRecaptcha } = useGoogleReCaptcha();

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (formData.userName.length < 3 || formData.userName.length > 50) {
            newErrors.userName = 'Username must be between 3 and 50 characters';
        }

        if (!/^[a-zA-Z\s]{2,255}$/.test(formData.name)) {
            newErrors.name = 'Name must contain only letters and spaces (2-255 characters)';
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
            newErrors.password = 'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character';
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (formData.company.name.length > 255) {
            newErrors.companyName = 'Company name cannot exceed 255 characters';
        }

        if (formData.company.companyIdentification.length > 100) {
            newErrors.companyIdentification = 'Company identification cannot exceed 100 characters';
        }

        if (!formData.company.country) {
            newErrors.companyCountry = 'Please select a country';
        }

        if (!/^\d{3}-\d{3}-\d{4}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number in the format ###-###-####';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available");
            return;
        }

        try {
            const token = await executeRecaptcha("register");
            const registerData: RegisterRequest = {
                ...formData,
                roles: ["ADMIN"],
                token,
                username: ''
            };
            await register(registerData);
            onClose();
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        section: 'main' | 'company' = 'main'
    ): void => {
        const { id, value } = e.target;
        if (section === 'company') {
            setFormData(prev => ({
                ...prev,
                company: {
                    ...prev.company,
                    [id]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleCountryChange = (value: string, section: 'main' | 'company' = 'company') => {
        if (section === 'company') {
            setFormData(prev => ({
                ...prev,
                country: value,
                company: {
                    ...prev.company,
                    country: value
                }
            }));
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto z-50">
            <div className="bg-white p-1 shadow-lg rounded-lg w-full max-w-2xl">
                <form onSubmit={handleSubmit} className="p-6 rounded-lg max-h-[90vh] h-auto overflow-auto">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-2xl font-bold text-color_brand">Registration Form</h2>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-color_brand hover:text-gray-700"
                        >
                            X
                        </button>
                    </div>
                    <p className='mb-6 text-sm'>Register yourself and your company. Once registered, you'll be able to add users to your company, manage permissions, inventory, appointments, and billing</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4 md:col-span-1">
                            <h3 className="text-lg font-semibold text-color_brand mb-4">Personal Information</h3>

                            <div>
                                <label htmlFor="name" className="block text-color_brand text-sm font-bold mb-2">
                                    Name*
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.name && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.name}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-color_brand text-sm font-bold mb-2">
                                    Email*
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.email}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-color_brand text-sm font-bold mb-2">
                                    Phone*
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.phone && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.phone}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="userName" className="block text-color_brand text-sm font-bold mb-2">
                                    Username*
                                </label>
                                <input
                                    id="userName"
                                    type="text"
                                    value={formData.userName}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.userName && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.userName}</p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-color_brand text-sm font-bold mb-2">
                                    Password*
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
                                )}
                            </div>

                        </div>

                        <div className="space-y-4 md:col-span-1">
                            <h3 className="text-lg font-semibold text-color_brand mb-4">Company Information</h3>

                            <div>
                                <label htmlFor="companyName" className="block text-color_brand text-sm font-bold mb-2">
                                    Company Name*
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.company.name}
                                    onChange={(e) => handleChange(e, 'company')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.companyName && (
                                    <p className="text-rose-600 text-xs italic mt-1">{errors.companyName}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="companyIdentification" className="block text-color_brand text-sm font-bold mb-2">
                                    Company ID*
                                </label>
                                <input
                                    id="companyIdentification"
                                    type="text"
                                    value={formData.company.companyIdentification}
                                    onChange={(e) => handleChange(e, 'company')}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                                {errors.companyIdentification && (
                                    <p className="text-red-500 text-xs italic mt-1">{errors.companyIdentification}</p>
                                )}
                            </div>

                            <div>
                                <label htmlFor="country" className="block text-color_brand text-sm font-bold mb-2">
                                    Country*
                                </label>
                                <CountrySelect
                                    value={formData.company.country}
                                    onChange={(value) => handleCountryChange(value)}
                                    error={errors.companyCountry}
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <ButtonIcon
                            type="submit"
                            text="Cancel"
                            onClick={onClose}
                        >
                            <BanIcon size={24} />
                        </ButtonIcon>
                        <ButtonIcon
                            type="submit"
                            text="Confirm"
                            onClick={() => handleSubmit}
                        >
                            <PlusIcon size={24} />
                        </ButtonIcon>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterModal;
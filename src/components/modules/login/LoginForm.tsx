import React, { useEffect, useState } from "react";
import type { LoginResponse } from "../../../types/AuthTypes";
import {
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { login } from "../../../hooks/useAuth";
import ButtonIcon from "../../common/buttons/ButtonIcon";
import { KeyRoundIcon, UserRoundPlusIcon } from "lucide-react";

interface LoginFormProps {
  setIsRegisterModalOpen: (isOpen: boolean) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ setIsRegisterModalOpen }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(null);
  const { executeRecaptcha } = useGoogleReCaptcha();

  useEffect(() => {
    if (loginResponse) {
      window.location.href = "/modules/dashboard/";
    }
  }, [loginResponse]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }

    try {
      const token = await executeRecaptcha("login");
      const data = await login(userName, password, token);
      if (data) {
        setLoginResponse(data);
        sessionStorage.setItem("userData", JSON.stringify(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="transform">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 "
      >
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-color_brand text-sm font-bold mb-2"
          >
            Username
          </label>
          <input
            id="userName"
            type="text"
            value={userName}
            autoComplete="current-user"
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your user name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-color_brand text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-color_brand mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex gap-4 items-center justify-between">
          <ButtonIcon
            type="submit"
            text="Sign In"
          >
            <KeyRoundIcon size={24} />
          </ButtonIcon>
          <ButtonIcon
            type="button"
            text="Register"
            onClick={() => setIsRegisterModalOpen(true)}
          >
            <UserRoundPlusIcon size={24} />
          </ButtonIcon>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
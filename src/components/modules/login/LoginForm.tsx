import React, { useEffect, useState } from "react";
import type { LoginResponse } from "../../../types/AuthType";
import {
  GoogleReCaptchaProvider,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { login } from "../../../hooks/useAuth";

const CAPTCHA_PUBLIC_KEY = import.meta.env.PUBLIC_CAPTCHA_KEY;

const LoginFormInner: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [loginResponse, setLoginResponse] = useState<LoginResponse | null>(
    null
  );
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
      console.log("failed")
      console.log(err);
    }
  };

  return (
    <div className="p-1 bg-aqua-brand-gradient shadow-lg transform rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="bg-white-brand-gradient p-4 rounded-lg"
      >
        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-teal text-sm font-bold mb-2"
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
            className="block text-teal text-sm font-bold mb-2"
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
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-skyblue-brand-gradient hover:bg-orange text-white font-bold py-2 px-4 rounded hover:scale-105 transition-transform duration-300 ease-in-out"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

const LoginForm: React.FC = () => {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey= {CAPTCHA_PUBLIC_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
      }}
    >
      <LoginFormInner />
    </GoogleReCaptchaProvider>
  );
};

export default LoginForm;

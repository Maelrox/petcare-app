import { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterModal from './RegisterModal';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const CAPTCHA_PUBLIC_KEY = import.meta.env.PUBLIC_CAPTCHA_KEY;

const AuthPage = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={CAPTCHA_PUBLIC_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
      }}
    >
      <>
      <div className="relative min-h-screen w-full bg-white">
        <div className="absolute bottom-0 right-0 hidden md:block h-[500px] overflow-hidden">
          <img
            src="/src/assets/login_doctor.png"
            alt="Doctor silhouette"
            className="object-cover h-full w-auto"
          />
        </div>

        <div className="absolute top-0 left-0 right-0 h-[275px] overflow-hidden md:hidden">
          <img
            src="/src/assets/login_doctor.png"
            alt="Doctor silhouette"
            className="object-cover w-full h-full opacity-50"
          />
        </div>

        <div className="relative flex min-h-screen items-center justify-center px-4">
          <div className="w-full max-w-lg space-y-6 bg-white p-8 shadow-xl">
            <div className="flex justify-center">
              <img
                src="/src/assets/logo-pet-care-suite.png"
                alt="Pet Care Suite Logo"
                className="w-48 md:w-64"
              />
            </div>

            <LoginForm setIsRegisterModalOpen={setIsRegisterModalOpen} />
          </div>
        </div>
      </div>

      <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />
      </>
    </GoogleReCaptchaProvider>
  );
};

export default AuthPage;
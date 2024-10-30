import type { FC } from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import RegisterModal from './RegisterModal';

const CAPTCHA_PUBLIC_KEY = import.meta.env.PUBLIC_CAPTCHA_KEY as string;

const RegisterModalWrapper: FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && (
        <GoogleReCaptchaProvider
          reCaptchaKey={CAPTCHA_PUBLIC_KEY}
          scriptProps={{
            async: false,
            defer: false,
            appendTo: 'head',
          }}
        >
          <RegisterModal isOpen={isOpen} onClose={onClose} />
        </GoogleReCaptchaProvider>
      )}
    </>
  );
};

export default RegisterModalWrapper;

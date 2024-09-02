import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '@nanostores/react';
import '../../../styles/Spinner.css';
import { isSpinnerRunning } from '../../utils/spinnerStore';

const Spinner = () => {
  const $isSpinnerRunning = useStore(isSpinnerRunning);
  return (
    <>
      {$isSpinnerRunning   && (
        <div className="spinner-container">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
};

export default Spinner;
import {useEffect, useState} from 'react';
import {AppRoutes} from './AppRoutes';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {RootState} from './store';
import Modal from './components/modal';

const App = () => {
  const navigate = useNavigate();
  const {isLoggedIn, isActive} = useSelector((state: RootState) => state.app);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const authPaths = [
      '/auth/login',
      '/auth/signup',
      '/auth/membership-account/membership-checkout',
    ];

    if (currentPath === '/') {
      if (!isLoggedIn) {
        navigate('/auth/login', {replace: true});
        return;
      }
      navigate('/dashboard', {replace: true});
      return;
    }

    if (isLoggedIn) {
      if (!isActive) {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    } else {
      if (!authPaths.includes(currentPath)) {
        setShowModal(false);
        navigate('/auth/login', {replace: true});
      }
    }
    if (currentPath === '/auth/activate-account' && isActive) {
      navigate('/dashboard');
    }
    if (currentPath === '/auth/activate-account') {
      setShowModal(false);
    }
  }, [isLoggedIn, isActive, navigate]);

  return (
    <>
      <AppRoutes />
      <Modal isOpen={showModal} closeable={false}>
        <h2 className="text-xl font-semibold mb-4">Account Not Activated</h2>
        <p className="text-gray-700 mb-4">
          Please check your email inbox and activate your account to continue
          using the platform.
        </p>
        <p className="text-sm text-gray-500">
          This dialog cannot be dismissed until activation is complete.
        </p>
      </Modal>
    </>
  );
};

export default App;

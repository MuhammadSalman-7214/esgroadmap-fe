import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../store/type';
import {useNavigate} from 'react-router-dom';
import {setIsActive} from '../../slice';
import api from '../../middleware';

const ActivateAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isLoggedIn, isActive} = useSelector((state: RootState) => state.app);
  const [activating, setActivating] = useState(true);

  const activate = async () => {
    try {
      await api.put('/user/activate', {});
      dispatch(setIsActive(true));
    } catch (error) {
      console.error('Activation failed:', error);
    } finally {
      setActivating(false);
      setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/auth/login');
    } else {
      if (!isActive) {
        activate();
      }
    }
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 px-4">
      <div className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full text-center animate-fade-in">
        {activating ? (
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mb-2" />
            <p className="text-lg font-medium text-gray-700">
              Activating your account...
            </p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-100 text-green-600 rounded-full p-3">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Account Activated!
            </h2>
            <p className="text-gray-600">Redirecting to dashboard shortly...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivateAccount;

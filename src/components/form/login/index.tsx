import {FunctionComponent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify';
import {useDispatch} from 'react-redux';
import Input from '../../ui/input';
import Button from '../../ui/button';
import {LoginFormData, loginSchema} from '../../../validations/schema/auth';
import {setIsLoggedIn, setIsActive} from '../../../slice';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Modal from '../../modal';
import EmailRequest from '../../emailRequest';
import OTPVerification from '../../otpVerification';
import SetNewPassword from '../../setNewPassword';
import {usePreviousLocation} from '../../../pages/previousLocation';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState('');
  const previousLocation = usePreviousLocation();
  const fromActivateAccount = previousLocation === '/auth/activate-account';
  const isLoggedIn = useSelector((state: any) => state.isLoggedIn);

  const openModal = () => setStep(1);
  const closeModal = () => {
    setStep(0);
    setEmail('');
  };
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    const {identifier, password} = data;
    setIsLoading(true);

    if (!identifier || !password) {
      toast.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/v1/auth/signin`,
        {identifier, password},
        {
          withCredentials: true,
        }
      );
      dispatch(setIsLoggedIn(true));
      dispatch(setIsActive(response.data.isActive));
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);
      localStorage.setItem('planId', response.data.planId);
      localStorage.setItem('planName', response.data.planName);
      localStorage.setItem('customerId', response.data.customerId);
      toast.success('Sign in successful!');
      setTimeout(() => {
        if (fromActivateAccount) {
          navigate('/auth/activate-account');
        } else {
          navigate('/dashboard');
        }
      }, 1000);
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'An unknown error occurred during sign-in.';
      toast.error(errorMessage);
      console.error('Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      if (fromActivateAccount) {
        navigate('/auth/activate-account');
      } else {
        navigate('/dashboard');
      }
    }
  }, []);
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto my-5 px-4 sm:px-6"
      >
        <div className="flex flex-col space-y-4">
          <Input
            id="identifier"
            label="Username or Email Address"
            type="text"
            placeholder="Enter your username or email"
            {...register('identifier')}
            errorMessage={errors.identifier?.message}
            className="w-full"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            placeholder="Enter your password"
            {...register('password')}
            errorMessage={errors.password?.message}
            className="w-full"
          />
          {/* <div className="flex gap-2 items-center">
          <Input
            label="Remember Me"
            id="terms"
            type="checkbox"
            className="w-auto"
          />
        </div> */}
        </div>

        <Button
          type="submit"
          label={isLoading ? 'Logging in...' : 'Login'}
          className="mt-5 w-full sm:w-auto buttonbg cursor-pointer"
          disabled={isLoading}
        />

        <div>
          <p
            className="texterror border-t-2 bordergray mt-8 font-semibold text-start cursor-pointer hover:underline"
            onClick={openModal}
          >
            Forgot password?
          </p>
          <Modal isOpen={step !== 0} onClose={closeModal}>
            {step === 1 && (
              <EmailRequest onSuccess={() => setStep(2)} setEmail={setEmail} />
            )}
            {step === 2 && (
              <OTPVerification
                email={email}
                onSuccess={() => setStep(3)}
                onTimeout={closeModal}
              />
            )}
            {step === 3 && (
              <SetNewPassword email={email} onClose={closeModal} />
            )}
          </Modal>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default LoginForm;

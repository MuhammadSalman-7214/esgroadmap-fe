import {FunctionComponent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '../../ui/input';
import Button from '../../ui/button';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
// import {PayPalButtons} from '@paypal/react-paypal-js';
import {useLocation} from 'react-router-dom';
import {SignUpFormData, signUpSchema} from '../../../validations/schema/auth';
import {isAuthenticated} from '../../../utils/auth';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const SignUpForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [enablePayment, setEnablePayment] = useState(false);
  const location = useLocation();
  const {packageData} = location.state || {};

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  const onSubmit = async (data: SignUpFormData) => {
    const {username, email, confirmEmail, password, confirmPassword} = data;
    setIsLoading(true);

    if (!username || !email || !confirmEmail || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username, email, password}),
      });

      if (response.ok) {
        await response.json();

        toast.success('Sign in successful! ');
        toast.info(
          'Please check your email inbox and click on the activation link we sent you.'
        );
        setTimeout(() => {
          navigate('/auth/login');
        }, 1000);
      } else {
        const errorData = await response.json();
        toast.error(`Sign in failed: ${errorData.error}`);
      }
    } catch (err) {
      toast.error('An error occurred during sign-in.');
      console.error('Sign-in error:', err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/dashboard');
    }
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-3xl mx-auto px-4 md:px-10 py-10"
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-baseline themetext gap-5">
          <h1 className="font-semibold text-2xl">Membership Level</h1>
          <p className="text-xs cursor-pointer">Change</p>
        </div>
        <p>
          You have selected the{' '}
          <span className="font-bold">{packageData.title}</span> membership
          level.
        </p>
        <p>{packageData.access}</p>
        <p>
          The price for membership{' '}
          <span className="font-bold">
            {packageData.currency}
            {packageData.amount}
          </span>
        </p>
      </div>

      <div className="flex flex-col space-y-4 my-5 py-5 border-y-2 bordergray">
        <div className="flex flex-col sm:flex-row sm:items-baseline themetext gap-5">
          <h1 className="font-semibold text-2xl">Account Information</h1>
          <Link to="/auth/login" className="text-xs">
            Already have an account? Log in here
          </Link>
        </div>

        <Input
          id="username"
          label="Username"
          type="text"
          placeholder="Enter username"
          {...register('username')}
          errorMessage={errors.username?.message}
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Enter your password"
          {...register('password')}
          errorMessage={errors.password?.message}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          {...register('confirmPassword')}
          errorMessage={errors.confirmPassword?.message}
        />
        <Input
          id="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
        <Input
          id="confirmEmail"
          label="Confirm Email Address"
          type="email"
          placeholder="Confirm your email"
          {...register('confirmEmail')}
          errorMessage={errors.confirmEmail?.message}
        />
      </div>

      <div className="flex flex-col space-y-4 border-b-2 pb-5 bordergray">
        <div className="themetext">
          <h1 className="font-semibold text-2xl">Payment Method</h1>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Input
              label="Pay with Stripe"
              id="stripe"
              type="radio"
              value="stripe"
              {...register('paymentMethod')}
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              label="Pay with PayPal"
              id="paypal"
              type="radio"
              value="paypal"
              defaultChecked
              {...register('paymentMethod')}
            />
          </div>
        </div>
      </div>

      <div className="my-6">
        <Button
          type="submit"
          label="Continue"
          className="w-full sm:w-auto buttonbg"
          disabled={isLoading}
        />
      </div>
      {/* {enablePayment ? (
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              intent: 'CAPTURE',
              purchase_units: [
                {
                  amount: {
                    value: '10.00',
                    currency_code: 'USD',
                  },
                },
              ],
            });
          }}
          onApprove={async (data, actions) => {
            const details = await actions.order?.capture();
            console.log('Payment Approved!', details);
          }}
        />
      ) : null} */}
    </form>
  );
};

export default SignUpForm;

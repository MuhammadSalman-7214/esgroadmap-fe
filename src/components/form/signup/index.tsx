import {FunctionComponent, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import Input from '../../ui/input';
import Button from '../../ui/button';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {SignUpFormData, signUpSchema} from '../../../validations/schema/auth';
import {isAuthenticated} from '../../../utils/auth';
import * as Paddle from '@paddle/paddle-js';
import api from '../../../middleware';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const CLIENT_SIDE_TOKEN = import.meta.env.VITE_CLIENT_SIDE_TOKEN;
const FREE_PLAN_ID = import.meta.env.VITE_FREE_PLAN_ID;

const SignUpForm: FunctionComponent = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const {packageData} = location.state || {};

  type SignUpPayload = {
    username: string;
    email: string;
    password: string;
    isPaid: boolean;
    planId?: string;
    planName?: string;
    customerId?: string;
  };

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });
  useEffect(() => {
    const init = async () => {
      await Paddle.initializePaddle({
        token: `${CLIENT_SIDE_TOKEN}`,
        environment: 'production',
        eventCallback: async (event: any) => {
          if (event.name === 'checkout.completed') {
            const paddle = Paddle.getPaddleInstance('v1');
            paddle?.Checkout.close();

            if (!formDataRef.current) {
              toast.error('Missing signup form data.');
              return;
            }

            const customerId = event.data?.customer?.id;
            if (!customerId) {
              toast.error('Missing customer ID in checkout response.');
              return;
            }

            try {
              const signupResponse = await fetch(
                `${API_BASE_URL}/api/v1/auth/signup`,
                {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                    ...formDataRef.current,
                    customerId,
                  }),
                }
              );

              if (!signupResponse.ok) {
                const errorData = await signupResponse.json();
                console.log('🚀 ~ eventCallback: ~ errorData:', errorData);
                toast.error(`Signup failed: ${errorData.message}`);
                return;
              }

              toast.success('Signup successful! You can now log in.');
              navigate('/auth/login');
            } catch (err) {
              toast.error('An error occurred during signup.');
              console.error('Signup error:', err);
            }
          }
        },
      });

      return () => {};
    };

    init();
  }, []);

  const openCheckout = (priceId: string) => {
    const paddle = Paddle.getPaddleInstance('v1');
    if (!paddle) {
      console.error('Paddle not initialized');
      return;
    }

    paddle.Checkout.open({
      items: [{priceId, quantity: 1}],
      settings: {
        displayMode: 'overlay',
      },
    });
  };

  const formDataRef = useRef<SignUpPayload | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      const findUserResponse = await api.post(
        `${API_BASE_URL}/api/v1/auth/findUser`,
        {email: data.email}
      );

      const result = await findUserResponse.data;

      if (result.message === true) {
        toast.info('User already exists. Redirecting to login...');
        setTimeout(() => {
          navigate('/auth/login');
        }, 1000);
        return;
      }

      // If plan is free
      if (data.planId === `${FREE_PLAN_ID}`) {
        const payload: SignUpPayload = {
          username: data.username,
          email: data.email,
          password: data.password,
          planId: data.planId,
          planName: data.planName,
          isPaid: false,
        };

        const signupResponse = await fetch(
          `${API_BASE_URL}/api/v1/auth/signup`,
          {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload),
          }
        );

        if (!signupResponse.ok) {
          const errorData = await signupResponse.json();
          toast.error(errorData.message);
          return;
        }

        toast.success('Signup successful! You can now log in.');
        navigate('/auth/login');
        return;
      }

      // Else store data and go to checkout
      formDataRef.current = {
        username: data.username,
        email: data.email,
        password: data.password,
        planId: data.planId,
        planName: data.planName,
        isPaid: true,
      };

      openCheckout(data.planId);
    } catch (error) {
      toast.error('An error occurred while checking user status.');
      console.error('Find user error:', error);
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
        <input type="hidden" value={packageData.id} {...register('planId')} />
        <input
          type="hidden"
          value={packageData.title}
          {...register('planName')}
        />
      </div>

      <div className="my-6">
        <Button
          type="submit"
          label="Continue"
          className="w-full sm:w-auto buttonbg cursor-pointer"
          disabled={isLoading}
        />
      </div>
    </form>
  );
};

export default SignUpForm;

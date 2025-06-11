import {FunctionComponent, useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'react-toastify';

import Input from '../../ui/input';
import Button from '../../ui/button';
import {
  EditProfileFormData,
  editProfileSchema,
} from '../../../validations/schema/auth';
import api from '../../../middleware';

const EditProfileForm: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const storedUsername = localStorage.getItem('username') || '';
  const storedEmail = localStorage.getItem('email') || '';

  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileSchema),
  });

  useEffect(() => {
    setValue('username', storedUsername);
    setValue('email', storedEmail);
  }, [setValue, storedUsername, storedEmail]);

  const onSubmit = async (data: EditProfileFormData) => {
    const {username, email} = data;
    setIsLoading(true);

    if (!username || !email) {
      toast.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.put(
        `https://esgroadmap-backend.vercel.app/api/v1/user/`,
        {username, email},
        {
          withCredentials: true,
        }
      );

      localStorage.setItem('username', response.data.username);
      localStorage.setItem('email', response.data.email);

      toast.success('Profile updated successful!');
    } catch (err) {
      toast.error('An error occurred during updating profile.');
      console.error('Update profile change error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full my-5 px-4 sm:px-6"
    >
      <h1 className="text-2xl font-bold pt-6 pb-5 themetext text-start">
        Edit Profile
      </h1>
      <div className="flex flex-col space-y-4">
        <Input
          id="username"
          label="Username"
          type="text"
          placeholder="Enter your username"
          {...register('username')}
          errorMessage={errors.username?.message}
          className="w-full"
        />
        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          {...register('email')}
          errorMessage={errors.email?.message}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        label={isLoading ? 'Submitting...' : 'Submit'}
        className="mt-5 w-full sm:w-auto buttonbg"
        disabled={isLoading}
      />
    </form>
  );
};

export default EditProfileForm;

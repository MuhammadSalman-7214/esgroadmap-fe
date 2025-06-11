import {FunctionComponent, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {toast} from 'react-toastify';

import Input from '../../ui/input';
import Button from '../../ui/button';
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from '../../../validations/schema/auth';
import api from '../../../middleware';

const ChangePasswordForm: FunctionComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const onSubmit = async (data: ChangePasswordFormData) => {
    const {oldPassword, newPassword} = data;
    setIsLoading(true);

    if (!oldPassword || !newPassword) {
      toast.error('Please fill in all fields.');
      setIsLoading(false);
      return;
    }

    try {
      await api.put(
        `https://esgroadmap-backend.vercel.app/api/v1/user/editpassword`,
        {oldPassword, newPassword},
        {
          withCredentials: true,
        }
      );

      toast.success('Password changed successful!');
    } catch (err) {
      toast.error('An error occurred during password change.');
      console.error('Password change error:', err);
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
        Change Password
      </h1>
      <div className="flex flex-col space-y-4">
        <Input
          id="oldPassword"
          label="Old Password"
          type="password"
          placeholder="Enter your old password"
          {...register('oldPassword')}
          errorMessage={errors.oldPassword?.message}
          className="w-full"
        />
        <Input
          id="newPassword"
          label="New Password"
          type="password"
          placeholder="Enter your new password"
          {...register('newPassword')}
          errorMessage={errors.newPassword?.message}
          className="w-full"
        />
      </div>

      <Button
        type="submit"
        label={isLoading ? 'Saving...' : 'Save'}
        className="mt-5 w-full sm:w-auto buttonbg"
        disabled={isLoading}
      />
    </form>
  );
};

export default ChangePasswordForm;

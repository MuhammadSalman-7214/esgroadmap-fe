import {FunctionComponent, useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {SetNewPasswordProps} from './type';
import Input from '../ui/input';
import Button from '../ui/button';

const SetNewPassword: FunctionComponent<SetNewPasswordProps> = ({
  email,
  onClose,
}) => {
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSetPassword = async () => {
    if (!newPassword) return toast.error('Password required!');
    try {
      setLoading(true);
      await axios.put(
        'https://esgroadmap-backend.vercel.app/api/v1/user/forgotPassword',
        {email, newPassword}
      );
      toast.success('Password updated successfully!');
      onClose();
    } catch (err) {
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-4">Set New Password</h2>
      <Input
        label="New Password"
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <Button
        label={loading ? 'Saving...' : 'Set Password'}
        onClick={handleSetPassword}
        disabled={loading}
        className="mt-4 w-full themebg"
      />
    </div>
  );
};

export default SetNewPassword;

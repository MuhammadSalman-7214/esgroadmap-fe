import {FunctionComponent, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Input from '../ui/input';
import Button from '../ui/button';
import {EmailRequestProps} from './type';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EmailRequest: FunctionComponent<EmailRequestProps> = ({
  onSuccess,
  setEmail,
}) => {
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendEmail = async () => {
    if (!userEmail) return toast.error('Email is required!');
    try {
      setLoading(true);
      await axios.post(
        `${API_BASE_URL}/api/v1/user/generateOtp`,
        {
          email: userEmail,
        }
      );
      setEmail(userEmail);
      toast.success('OTP sent to your email');
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-4">Forgot Password</h2>
      <Input
        label="Email"
        type="email"
        value={userEmail}
        onChange={(e) => setUserEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <Button
        label={loading ? 'Sending...' : 'Send Password Reset Instruction'}
        onClick={handleSendEmail}
        disabled={loading}
        className="mt-4 w-full themebg cursor-pointer"
      />
    </div>
  );
};

export default EmailRequest;

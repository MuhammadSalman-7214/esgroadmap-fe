import {FunctionComponent, useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import axios from 'axios';
import {OTPVerificationProps} from './type';
import Input from '../ui/input';
import Button from '../ui/button';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const OTPVerification: FunctionComponent<OTPVerificationProps> = ({
  email,
  onSuccess,
  onTimeout,
}) => {
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          toast.error('OTP expired');
          onTimeout();
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerifyOTP = async () => {
    try {
      setLoading(true);
      await axios.post(`${API_BASE_URL}/api/v1/user/verifyOtp`, {email, otp});
      toast.success('OTP verified');
      onSuccess();
    } catch (err) {
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-base font-semibold mb-4">Enter OTP</h2>
      <p className="mb-2 text-sm text-gray-500">
        Time left: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:
        {String(timeLeft % 60).padStart(2, '0')}
      </p>
      <Input
        label="OTP"
        type="text"
        value={otp}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '').slice(0, 4);
          setOtp(value);
        }}
        placeholder="Enter OTP"
      />
      <Button
        label={loading ? 'Verifying...' : 'Verify OTP'}
        onClick={handleVerifyOTP}
        disabled={loading}
        className="mt-4 w-full themebg cursor-pointer"
      />
    </div>
  );
};

export default OTPVerification;

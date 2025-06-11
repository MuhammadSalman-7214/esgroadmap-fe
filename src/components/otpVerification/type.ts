export type OTPVerificationProps = {
  onSuccess: () => void;
  email: string;
  onTimeout: () => void;
};

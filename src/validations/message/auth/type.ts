export interface AuthMessages {
  login: {
    LoginFormData : {
      required: string;
      invalid: string;
    };
    password: {
      required: string;
      minLength: string;
    };
  };
  signup: {
    username: {
      required: string;
      invalid: string;
    };
    email: {
      required: string;
      invalid: string;
    };
    confirmEmail: {
      required: string;
      invalid: string;
    };
    password: {
      required: string;
      minLength: string;
    };
    confirmPassword: {
      required: string;
      minLength: string;
    };
    planId: {
      required: string;
    };
    planName: {
      required: string;
    };
  };
  changePassword: {
    oldPassword: {
      required: string;
      minLength: string;
    };
    newPassword: {
      required: string;
      minLength: string;
    };
  };
  editProfile: {
    username: {
      required: string;
      invalid: string;
    };
    email: {
      required: string;
      invalid: string;
    };
  };
}

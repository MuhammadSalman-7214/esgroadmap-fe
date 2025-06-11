import {AuthMessages} from './type';

const authMessages: AuthMessages = {
  login: {
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be at least 6 characters',
    },
  },
  signup: {
    username: {
      required: 'Username is required',
      invalid: 'Please enter a valid username',
    },
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    confirmEmail: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
    password: {
      required: 'Password is required',
      minLength: 'Password must be at least 6 characters',
    },
    confirmPassword: {
      required: 'Password is required',
      minLength: 'Password must be at least 6 characters',
    },
  },
  changePassword: {
    oldPassword: {
      required: 'Old Password is required',
      minLength: 'Password must be at least 6 characters',
    },
    newPassword: {
      required: 'New Password is required',
      minLength: 'Password must be at least 6 characters',
    },
  },
  editProfile: {
    username: {
      required: 'Username is required',
      invalid: 'Please enter a valid username',
    },
    email: {
      required: 'Email is required',
      invalid: 'Please enter a valid email address',
    },
  },
};

export default authMessages;

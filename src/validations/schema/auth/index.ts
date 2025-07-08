import {z} from 'zod';
import errors from '../../message';

export const loginSchema = z.object({
  identifier: z
    .string({required_error: errors.auth.login.LoginFormData.required})
    .min(3, errors.auth.login.LoginFormData.invalid),
  password: z
    .string({required_error: errors.auth.login.password.required})
    .min(6, errors.auth.login.password.minLength),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z.object({
  username: z
    .string({required_error: errors.auth.signup.username.required})
    .min(3, errors.auth.signup.username.invalid),
  email: z
    .string({required_error: errors.auth.signup.email.required})
    .email(errors.auth.signup.email.invalid),
  confirmEmail: z
    .string({required_error: errors.auth.signup.email.required})
    .email(errors.auth.signup.email.invalid),
  password: z
    .string({required_error: errors.auth.signup.password.required})
    .min(6, errors.auth.signup.password.minLength),
  confirmPassword: z
    .string({required_error: errors.auth.signup.password.required})
    .min(6, errors.auth.signup.password.minLength),
  planId: z.string({required_error: errors.auth.signup.planId.required}),
  planName: z.string({required_error: errors.auth.signup.planName.required}),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

export const changePasswordSchema = z.object({
  oldPassword: z
    .string({required_error: errors.auth.changePassword.oldPassword.required})
    .min(6, errors.auth.changePassword.oldPassword.minLength),
  newPassword: z
    .string({
      required_error: errors.auth.changePassword.newPassword.required,
    })
    .min(6, errors.auth.changePassword.newPassword.minLength),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

export const editProfileSchema = z.object({
  username: z
    .string({required_error: errors.auth.editProfile.username.required})
    .min(3, errors.auth.editProfile.username.invalid),
  email: z
    .string({
      required_error: errors.auth.editProfile.email.required,
    })
    .email(errors.auth.editProfile.email.invalid),
});

export type EditProfileFormData = z.infer<typeof editProfileSchema>;

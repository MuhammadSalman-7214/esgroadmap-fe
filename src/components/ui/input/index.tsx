import {FunctionComponent, useState} from 'react';
import {InputProps} from './type';

const Input: FunctionComponent<InputProps> = ({
  label,
  errorMessage,
  id,
  type = 'text',
  ...rest
}) => {
  const isCheckbox = type === 'checkbox';
  const isRadio = type === 'radio';
  const isPassword = type === 'password';
  const isCheckLike = isCheckbox || isRadio;
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div
      className={`flex flex-col ${!isCheckLike ? 'space-y-1' : 'space-y-0'}`}
    >
      <div
        className={`flex ${isCheckLike ? 'items-center gap-2' : 'flex-col'}`}
      >
        {label && id && !isCheckLike && (
          <label htmlFor={id} className="font-medium mb-1 block">
            {label}
          </label>
        )}

        <div className="w-full flex items-center gap-2 relative">
          <input
            id={id}
            type={inputType}
            {...rest}
            className={
              isCheckLike
                ? 'w-4 h-4'
                : 'w-full px-3 py-2 border bordergray whitebg rounded-md pr-10'
            }
          />

          {label && id && isCheckLike && (
            <label htmlFor={id} className="text-sm font-medium">
              {label}
            </label>
          )}

          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-6 textgray"
            >
              <img
                src={
                  showPassword ? '/icons/eye-open.svg' : '/icons/eye-close.svg'
                }
                alt={showPassword ? 'Hide password' : 'Show password'}
                className="h-4 w-4"
              />
            </button>
          )}

          {!isCheckLike && <span className="font-bold text-lg">*</span>}
        </div>
      </div>

      {!isCheckLike && errorMessage && (
        <span className="texterror text-sm">{errorMessage}</span>
      )}
    </div>
  );
};

export default Input;

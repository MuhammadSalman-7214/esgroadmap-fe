import {FunctionComponent} from 'react';
import {ButtonProps} from './type';
import {baseStyles} from './constant';

const Button: FunctionComponent<ButtonProps> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  const baseStyle = `${baseStyles} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseStyle}
    >
      {label}
    </button>
  );
};

export default Button;

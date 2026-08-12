import clsx from 'clsx';

interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'default' | 'danger' | 'success';
  variant?: 'text' | 'outlined' | 'contained';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

function Button({ label, onClick, startIcon, endIcon, color = 'default', variant = 'contained', disabled = false, type = 'button', className }: ButtonProps) {
  const containedOrange = 'bg-blue-800 hover:bg-blue-700 active:bg-blue-900 text-white';
  const containedGray = 'bg-gray-300 hover:bg-gray-400 active:bg-gray-500';
  const containedBlue = 'bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white';
  const containedRed = 'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white';
  const containedGreen = 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white';

  const outlined = 'border bg-white';
  const outlinedOrange = `text-blue-800
    border-blue-800
    hover:border-blue-700
    active:border-blue-900`;
  const outlinedGray = `text-gray-500
    border-gray-500
    hover:border-gray-600
    active:border-gray-700`;
  const outlinedBlue = `text-blue-500
    border-blue-500
    hover:border-blue-600
    active:border-blue-700`;
  const outlinedRed = `text-red-500
    border-red-500
    hover:border-red-600
    active:border-red-700`;
  const outlinedGreen = `text-green-500
    border-green-500
    hover:border-green-600
    active:border-green-700`;

  const textOrange = 'text-blue-800 hover:text-blue-700 active:text-blue-900';
  const textGray = 'text-gray-500 hover:text-gray-600 active:text-gray-700';
  const textBlue = 'text-blue-500 hover:text-blue-600 active:text-blue-700';
  const textRed = 'text-red-500 hover:text-red-600 active:text-red-700';
  const textGreen = 'text-green-500 hover:text-green-600 active:text-green-700';

  const styles: string[] = [];

  if (variant === 'contained') {
    if (color === 'secondary') styles.push(containedOrange);
    if (color === 'primary') styles.push(containedBlue);
    if (color === 'default') styles.push(containedGray);
    if (color === 'danger') styles.push(containedRed);
    if (color === 'success') styles.push(containedGreen);
  }

  if (variant === 'outlined') {
    styles.push(outlined);
    if (color === 'secondary') styles.push(outlinedOrange);
    if (color === 'primary') styles.push(outlinedBlue);
    if (color === 'default') styles.push(outlinedGray);
    if (color === 'danger') styles.push(outlinedRed);
    if (color === 'success') styles.push(outlinedGreen);
  }

  if (variant === 'text') {
    if (color === 'secondary') styles.push(textOrange);
    if (color === 'primary') styles.push(textBlue);
    if (color === 'default') styles.push(textGray);
    if (color === 'danger') styles.push(textRed);
    if (color === 'success') styles.push(textGreen);
  }

  return (
    <button
      className={clsx(styles.join(' '), 'flex items-center justify-center rounded-md px-2 py-1', className)}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <span className='mr-2'>{startIcon}</span> {label} <span className='ml-2'>{endIcon}</span>
    </button>
  );
}

export default Button;

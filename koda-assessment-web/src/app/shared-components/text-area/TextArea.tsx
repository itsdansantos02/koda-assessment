import React from 'react';
import CrudField from '../crud/field/CrudField';

type TextAreaProps = {
  label?: string;
  placeholder?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  id?: string;
  name?: string;
  className?: string;
  value?: any;
  onChange?: (value: string) => void;
  errorMessage?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  readOnly?: boolean;
  readOnlyClass?: string;
  hasReadOnlyLabel?: boolean;
};

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, placeholder, startIcon, endIcon, id, name, className, value, onChange, errorMessage, required = false, disabled = false, rows = 3, readOnly = false, readOnlyClass = '', hasReadOnlyLabel = true }, ref) => {
    if(readOnly) {
      return (
        <CrudField label={hasReadOnlyLabel ? `${label}${label?.length ? ":" : ""} ` : undefined} className={readOnlyClass}>{value}</CrudField>
      )
    }
    return (
      <div className={`space-y-4 text-left ${className}`}>
        {label && (
          <label htmlFor={id}>
            {label} {required && <span className='text-red-500'>*</span>}
          </label>
        )}
        <div className='flex items-center rounded-md border border-gray-300 bg-white'>
          {startIcon && <span className='ml-10'>{startIcon}</span>}
          <textarea
            ref={ref}
            rows={rows}
            id={id}
            name={name}
            className='w-full rounded-md px-4 py-3'
            placeholder={placeholder}
            value={value ?? ''}
            onChange={(e) => {
              if (onChange) onChange(e.target.value);
            }}
            disabled={disabled}
          />
          {endIcon && <span className='mr-10'>{endIcon}</span>}
        </div>
        {errorMessage && <p className='text-sm text-red-500'>{errorMessage}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea'; // <-- Important for debugging with React

export default TextArea;

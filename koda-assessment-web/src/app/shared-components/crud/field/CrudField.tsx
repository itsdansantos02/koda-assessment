interface CrudFieldProps {
  label?: string | React.ReactNode;
  children?: React.ReactNode | string;
  className?: string;
  childClassName?: string;
}

function CrudField({ label, children, className, childClassName }: CrudFieldProps) {
  return (
    <div className={className}>
      <p className='font-semibold'>{label}</p>
      <div className={childClassName}>{children ?? '-'}</div>
    </div>
  );
}

export default CrudField;

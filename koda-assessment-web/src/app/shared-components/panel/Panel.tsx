import React from 'react';

type PanelProps = {
  title: string;
  color?: 'default' | 'danger' | 'success' | 'secondary' | 'primary' | 'accent' | 'blue';
  children: React.ReactNode;
  className?: string;
  onEdit?: () => void;
  onDelete?: () => void;
};

function Panel({ title, color = 'blue', children, className, onEdit, onDelete }: PanelProps) {
  const styles: string[] = [];

  if (color === 'default') {
    styles.push('bg-white text-gray-800');
  } else if (color === 'primary') {
    styles.push('bg-orange-50 text-blue-800');
  } else if (color === 'danger') {
    styles.push('bg-red-50 text-red-800');
  } else if (color === 'success') {
    styles.push('bg-green-50 text-green-800');
  } else if (color === 'secondary') {
    styles.push('bg-gray-200 text-gray-800');
  } else if (color === 'blue') {
    styles.push('bg-blue-50 text-blue-800');
  } else if (color === 'accent') {
    styles.push('bg-deep-purple-50 text-deep-purple-800');
  } else {
    styles.push('bg-white text-gray-800');
  }

  return (
    <div className={`${className} shadow-lg rounded-md bg-white group relative`}>
      <div className='overflow-hidden'>
        <div className={`rounded-t-md px-6 py-3 font-bold ${styles.join(' ')} flex justify-between items-center`}>
          <span>{title}</span>
        </div>
        <div className='break-words p-5'>{children}</div>
      </div>
    </div>
  );
}

export default Panel;

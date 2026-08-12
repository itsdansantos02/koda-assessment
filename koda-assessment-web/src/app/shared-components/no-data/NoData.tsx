interface NoDataMessageProps {
  message?: string;
}

function NoDataMessage({ message = 'No data available.' }: NoDataMessageProps) {
  return (
    <div className='flex h-full items-center justify-center py-10'>
      <p className='text-gray-600'>{message}</p>
    </div>
  );
}

export default NoDataMessage;

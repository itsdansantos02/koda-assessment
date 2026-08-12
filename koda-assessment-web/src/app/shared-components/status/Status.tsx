import { ProjectStatus } from '../../main/project/enum/ProjectEnum';
// Type for status component prop
interface StatusProps {
  label: string;
  className?: string;
  variant?: 'contained' | 'text';
}

function Status({ label, className, variant = 'contained' }: StatusProps) {
  const styles: string[] = [];
  const labelLowercase = label?.toLowerCase();

  //  Group status with similar color
  const greenGroup = [
    ProjectStatus.COMPLETED
  ];
  const orangeGroup = [
    ProjectStatus.IN_PROGRESS,
    ProjectStatus.PLANNING
  ];
  const grayGroup = [
    ProjectStatus.ON_HOLD
  ];

  // Variant: Contained
  if (variant === 'contained') {
    if (greenGroup.map((e) => e.toLowerCase()).includes(labelLowercase)) {
      styles.push('bg-green-100 text-green-600 px-6');
    }
    if (orangeGroup.map((e) => e.toLowerCase()).includes(labelLowercase)) {
      styles.push('bg-orange-100 text-orange-600 px-6');
    }
    if (grayGroup.map((e) => e.toLowerCase()).includes(labelLowercase)) {
      styles.push('bg-gray-200 text-gray-800 px-6');
    }
  }

  // Variant: Text
  if (variant === 'text') {
    if (greenGroup.map((e) => e.toLowerCase()).includes(labelLowercase)) {
      styles.push('bg-transparent text-green-600');
    }
    if (orangeGroup.map((e) => e.toLowerCase()).includes(labelLowercase)) {
      styles.push('bg-transparent text-orange-600');
    }
    if (grayGroup.map((e) => e.toLowerCase()).includes(labelLowercase)) {
      styles.push('bg-transparent text-gray-600');
    }
  }

  return (
    <div className={`${styles.join(' ')} font-semibold inline-block py-2 rounded text-center text-sm items-center ${className}`}>
      <span>{label}</span>
    </div>
  );
}

export default Status;

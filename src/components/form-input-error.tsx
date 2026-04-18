import type { FieldError } from 'react-hook-form';

import { cn } from '@/features/utils';

interface IFormErrorMessageProps {
  error?: { message: string } | FieldError;
  className?: string;
}

export function FormErrorMessage({ error, className }: IFormErrorMessageProps) {
  return (
    <p className={cn('m-0 p-0 pl-2 text-[10px] text-red-500', className)}>
      {' '}
      {error && ` *${error?.message}`}
    </p>
  );
}

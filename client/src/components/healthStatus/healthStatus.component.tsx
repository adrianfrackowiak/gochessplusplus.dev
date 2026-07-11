import type { FC, ReactElement } from 'react';

import type { HealthStatusProps } from './healthStatus.props';

export const HealthStatusComponent: FC<HealthStatusProps> = (props: HealthStatusProps): ReactElement => {
  const { status, version, isPending, isError }: HealthStatusProps = props;

  if (isPending) {
    return (
      <span className='inline-flex items-center gap-2 text-sm text-slate-400'>
        <span className='h-2 w-2 animate-pulse rounded-full bg-slate-500' />
        api health check: loading...
      </span>
    );
  }

  if (isError) {
    return (
      <span className='inline-flex items-center gap-2 text-sm text-rose-400'>
        <span className='h-2 w-2 rounded-full bg-rose-500' />
        api health check: api error
      </span>
    );
  }

  return (
    <span className='inline-flex items-center gap-2 text-sm text-cyan-300'>
      <span className='h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.7)]' />
      api health check: {status ?? '-'} · v{version ?? '-'}
    </span>
  );
};

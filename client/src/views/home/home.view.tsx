import { type QueryFunctionContext, useQuery, type UseQueryResult } from '@tanstack/react-query';
import type { FC, ReactElement } from 'react';

import { getHealth } from '@/api/v1/health';
import { HealthStatusComponent } from '@/components';
import { QueryKeyEnum } from '@/enums/system';
import type { HealthResponseInterface } from '@/interfaces';

const HomeView: FC = (): ReactElement => {
  const { data, isPending, isError }: UseQueryResult<HealthResponseInterface> = useQuery({
    queryKey: [QueryKeyEnum.Health],
    queryFn: (client: QueryFunctionContext): Promise<HealthResponseInterface> => getHealth(client.signal),
  });

  return (
    <div className='relative min-h-screen w-full overflow-hidden bg-black'>
      <div
        className='absolute inset-0 z-0'
        style={{
          background: 'radial-gradient(70% 55% at 50% 50%, #2a5d77 0%, #184058 18%, #0f2a43 34%, #0a1b30 50%, #071226 66%, #040d1c 80%, #020814 92%, #01040d 97%, #000309 100%), radial-gradient(160% 130% at 10% 10%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%), radial-gradient(160% 130% at 90% 90%, rgba(0,0,0,0) 38%, #000309 76%, #000208 100%)',
        }}
      />
      <main className='relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center text-slate-100'>
        <div className='glass flex flex-col items-center gap-7 px-24 py-12'>
          <h1 className='text-4xl font-semibold tracking-tight transition-transform duration-500 hover:scale-105 sm:text-6xl'>
            gochessplusplus
            <span className='animate-pulse text-cyan-400 drop-shadow-[0_0_18px_rgba(34,211,238,0.55)]'>.dev</span>
          </h1>
          <div className='flex items-center gap-4'>
            <p className='max-w-sm text-sm leading-relaxed text-slate-400'>
              Real-time chess engine. Built with Go, C++ and TypeScript.
            </p>
            <HealthStatusComponent status={data?.status} version={data?.version} isError={isError} isPending={isPending} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeView;

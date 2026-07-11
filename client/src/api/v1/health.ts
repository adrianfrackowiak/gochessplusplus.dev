import { api } from '@/api/api';
import type { HealthResponseInterface } from '@/interfaces';

export const getHealth = async (
  signal?: AbortSignal,
): Promise<HealthResponseInterface> => {
  const response = await api.get<HealthResponseInterface>('/v1/health', { signal });

  return response.data;
};

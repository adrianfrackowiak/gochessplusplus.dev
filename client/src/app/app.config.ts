import type { AppConfig } from '@/interfaces';


export const appConfig: AppConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? ''
};

export const environment = {
  production: true,
  apiBase: (typeof window !== 'undefined' && (window as any)['__API_BASE__']) || '/api'
};



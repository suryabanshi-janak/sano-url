import { createContext, PropsWithChildren, useContext, useEffect } from 'react';

import { getCurrentUser } from '@/db/auth';
import useFetch from '@/hooks/useFetch';
import { User } from '@supabase/supabase-js';

const UrlContext = createContext<{
  user: User | null;
  fetchUser: () => Promise<void>;
  loading: null | boolean;
  isAuthenticated: boolean;
}>({
  user: null,
  fetchUser: () => new Promise((resolve) => resolve()),
  loading: false,
  isAuthenticated: false,
});

const UrlProvider = ({ children }: PropsWithChildren) => {
  const { data: user, loading, fn: fetchUser } = useFetch(getCurrentUser);

  const isAuthenticated =
    (user && (user as User).role === 'authenticated') || false;

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const useFetch = (cb: any, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean | null>(null);
  const [error, setError] = useState<unknown>(null);

  const fn = async (...args: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      setData(response);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn };
};

export default useFetch;

import { useNavigate } from 'react-router-dom';
import { PropsWithChildren, useEffect } from 'react';
import { UrlState } from '../URLProvider';
import { Loader2 } from 'lucide-react';

function ProtectedRoute({ children }: PropsWithChildren) {
  const navigate = useNavigate();

  const { loading, isAuthenticated } = UrlState();

  useEffect(() => {
    if (!isAuthenticated && loading === false) navigate('/auth');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading]);

  if (loading) return <Loader2 className='stroke-1 animate-spin size-6' />;

  if (isAuthenticated) return children;
}

export default ProtectedRoute;

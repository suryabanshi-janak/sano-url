import { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { Filter } from 'lucide-react';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { UrlState } from '@/components/URLProvider';
import { getUrlClicks } from '@/db/clicks';
import { getUrls } from '@/db/urls';
import useFetch from '@/hooks/useFetch';
import CreateLink from '@/components/CreateLink';
// import Error from '@/components/Error';
import LinkCard from '@/components/LinkCard';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { user } = UrlState();

  const {
    loading,
    // error,
    data: urls,
    fn: fnUrls,
  } = useFetch(getUrls, user?.id);

  const {
    loading: loadingClicks,
    data: clicks,
    fn: fnClicks,
  } = useFetch(
    getUrlClicks,
    //  @ts-expect-error fetch only when urls is present
    urls?.map((url) => url.id)
  );

  useEffect(() => {
    fnUrls();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  useEffect(() => {
    if (urls?.length) fnClicks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls?.length]);

  const filteredUrls = urls?.filter((url: { title: string }) =>
    url.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='flex flex-col gap-8'>
      {(loading || loadingClicks) && (
        <BarLoader width={'100%'} color='#36d7b7' />
      )}
      <div className='grid grid-cols-2 gap-4'>
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>
      <div className='flex justify-between'>
        <h1 className='text-4xl font-extrabold'>My Links</h1>
        <CreateLink />
      </div>
      <div className='relative'>
        <Input
          type='text'
          placeholder='Filter Links...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className='absolute p-1 top-2 right-2' />
      </div>
      {/* {error && <Error message={error?.message} />} */}
      {(filteredUrls || []).map((url: unknown, i: number) => (
        <LinkCard key={i} url={url} fetchUrls={fnUrls} />
      ))}
    </div>
  );
}

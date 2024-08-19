import supabase from './supabase';

export const getUrlClicks = async (urlIds: string[]) => {
  const { data, error } = await supabase
    .from('clicks')
    .select('*')
    .in('url_id', urlIds);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to load clicks');
  }

  return data;
};

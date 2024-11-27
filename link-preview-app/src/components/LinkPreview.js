import React from 'react';
import { useQuery } from '@tanstack/react-query';

const LinkPreview = ({ url }) => {
  const fallbackImage = 'https://via.placeholder.com/150';

  const {
    data: image,
    isSuccess,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: [`image-preview-${url}`],
    queryFn: async () => {
      // 프록시 서버를 통해 CORS 우회
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        url
      )}`;
      return proxyUrl;
    },
    enabled: !!url, // URL이 제공된 경우에만 실행
  });

  return (
    <div>
      {isFetching && <p>Loading preview...</p>}
      {isError && <p>Error: {error.message}</p>}
      {isSuccess && (
        <img src={image} alt="Link Preview" style={{ maxWidth: '100%' }} />
      )}
    </div>
  );
};

export default LinkPreview;

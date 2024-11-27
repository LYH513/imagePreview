import React from 'react';
import { useQuery } from '@tanstack/react-query';

const LinkPreview = ({ url }) => {
  const {
    data: image,
    isSuccess,
    isFetching,
  } = useQuery({
    queryKey: [`link-preview-${url}`],
    queryFn: async () => {
      try {
        const response = await fetch(url);
        const data = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        const image =
          doc
            .querySelector('meta[property="og:image"]')
            ?.getAttribute('content') || '';
        return image;
      } catch (error) {
        console.error('Error fetching link preview:', error);
        return '';
      }
    },
    enabled: !!url, // Only run if URL is provided
  });

  return (
    <div>
      {isFetching && <p>Loading preview...</p>}
      {isSuccess && image ? (
        <img src={image} alt="Link Preview" style={{ maxWidth: '100%' }} />
      ) : (
        !isFetching && <p>No preview available</p>
      )}
    </div>
  );
};

export default LinkPreview;

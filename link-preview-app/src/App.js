import React, { useState } from 'react';
import LinkPreview from './components/LinkPreview';

const App = () => {
  const [url, setUrl] = useState('');

  const handleInputChange = (e) => {
    setUrl(e.target.value);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Link Preview</h1>
      <input
        type="text"
        placeholder="Enter a URL"
        value={url}
        onChange={handleInputChange}
        style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
      />
      {/* {url && <LinkPreview url={url} />} */}
    </div>
  );
};

export default App;

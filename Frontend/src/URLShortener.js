import React, { useState, useEffect } from 'react';
import { Button, TextField, Typography, Box } from '@mui/material';
import Log from './loggingMiddleware';
import { useNavigate, useParams } from 'react-router-dom';

function URLShortener() {
  const [urls, setUrls] = useState([{ longUrl: '', validity: 30, shortcode: '' }]);
  const [shortenedUrls, setShortenedUrls] = useState(() => {
    const saved = localStorage.getItem('shortenedUrls');
    return saved ? JSON.parse(saved) : [];
  });
  const navigate = useNavigate();
  const { shortcode } = useParams();

  useEffect(() => {
    localStorage.setItem('shortenedUrls', JSON.stringify(shortenedUrls));
  }, [shortenedUrls]);

  const handleInputChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const handleShorten = async () => {
    const validUrls = urls.filter(url => url.longUrl && isValidUrl(url.longUrl));
    if (validUrls.length === 0) {
      alert('Please enter at least one valid URL.');
      return;
    }
    if (validUrls.length > 5) {
      alert('Maximum 5 URLs allowed.');
      return;
    }

    const newShortened = validUrls.map(url => {
      const short = url.shortcode || generateShortcode();
      const expiry = new Date(Date.now() + (url.validity || 30) * 60000).toISOString();
      return { ...url, shortcode: short, expiry, created: new Date().toISOString() };
    });

    try {
      await Log('frontend', 'info', 'urlshortener', `Shortened ${newShortened.length} URLs`);
      setShortenedUrls(prev => [...prev, ...newShortened]);
      alert('URLs shortened successfully!');
    } catch (error) {
      console.error('Logging failed:', error.message);
      alert('Failed to log event: ' + error.message);
    }
  };

  const generateShortcode = () => Math.random().toString(36).substr(2, 6);

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  if (shortcode) {
    console.log('Checking shortcode:', shortcode, 'in', shortenedUrls); // Debug log
    const url = shortenedUrls.find(u => u.shortcode === shortcode);
    if (url && new Date(url.expiry) > new Date()) {
      window.location.href = url.longUrl;
      return null;
    }
    return <Typography>Short URL expired or not found.</Typography>;
  }

  return (
    <Box>
      <Typography variant="h4">URL Shortener</Typography>
      {urls.map((url, index) => (
        <Box key={index} sx={{ mb: 2 }}>
          <TextField
            label="Long URL"
            value={url.longUrl}
            onChange={(e) => handleInputChange(index, 'longUrl', e.target.value)}
            fullWidth
          />
          <TextField
            label="Validity (minutes)"
            type="number"
            value={url.validity}
            onChange={(e) => handleInputChange(index, 'validity', e.target.value)}
            sx={{ ml: 2 }}
          />
          <TextField
            label="Custom Shortcode"
            value={url.shortcode}
            onChange={(e) => handleInputChange(index, 'shortcode', e.target.value)}
            sx={{ ml: 2 }}
          />
        </Box>
      ))}
      <Button variant="contained" onClick={handleShorten}>Shorten URLs</Button>
      <Button variant="outlined" sx={{ ml: 2 }} onClick={() => navigate('/stats')}>
        View Stats
      </Button>
      {shortenedUrls.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography>Shortened URLs:</Typography>
          {shortenedUrls.map((url, i) => (
            <Typography key={i}>{url.longUrl} → http://localhost:3000/{url.shortcode} (Expires: {url.expiry})</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default URLShortener;
import React from 'react';
import { Typography, Box } from '@mui/material';

function URLStats() {
  const stats = [
    { shortcode: 'abc123', longUrl: 'https://example.com', created: '2025-07-11T11:00:00Z', expiry: '2025-07-11T11:30:00Z', clicks: 2, clickData: [{ timestamp: '2025-07-11T11:05:00Z', source: 'direct', location: 'India' }] },
  ];

  return (
    <Box>
      <Typography variant="h4">URL Shortener Statistics</Typography>
      {stats.map((stat, index) => (
        <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc' }}>
          <Typography>Shortened URL: {stat.shortcode}</Typography>
          <Typography>Original URL: {stat.longUrl}</Typography>
          <Typography>Created: {stat.created}</Typography>
          <Typography>Expires: {stat.expiry}</Typography>
          <Typography>Total Clicks: {stat.clicks}</Typography>
          <Typography>Click Data:</Typography>
          {stat.clickData.map((click, i) => (
            <Typography key={i}>- {click.timestamp} from {click.source} ({click.location})</Typography>
          ))}
        </Box>
      ))}
    </Box>
  );
}

export default URLStats;
const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // serve frontend files

app.post('/api/download', (req, res) => {
  const url = req.body.url;
  if (!url) return res.json({ success: false, error: 'URL is required' });

  const command = `yt-dlp -g "${url}"`;

  exec(command, (error, stdout, stderr) => {
    if (error || stderr) {
      return res.json({ success: false, error: 'Failed to fetch video link.' });
    }

    const directLink = stdout.trim().split('\n')[0];
    res.json({ success: true, download: directLink });
  });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

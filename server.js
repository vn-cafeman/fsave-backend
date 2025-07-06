const express = require('express');
const bodyParser = require('body-parser');
const ytdlp = require('yt-dlp-exec');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname));

app.post('/api/download', async (req, res) => {
  const url = req.body.url;
  if (!url) return res.json({ success: false, error: 'URL is required' });

  try {
    const output = await ytdlp(url, {
      dumpSingleJson: true,
      noWarnings: true,
      noCallHome: true,
    });

    const directLink = output.url || (output.formats && output.formats[0]?.url);
    if (!directLink) throw new Error("No video URL found");

    res.json({ success: true, download: directLink });
  } catch (err) {
    res.json({ success: false, error: 'Failed to fetch video link.' });
  }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));

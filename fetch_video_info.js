const fetch = require('node-fetch');
const fs = require('fs');

async function getVideoInfo(videoId, apiKey) {
  const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.items.length === 0) {
    throw new Error('Video not found or is private.');
  }

  return data.items[0];
}

const videoId = process.env.YOUTUBE_VIDEO_ID;
const apiKey = process.env.YOUTUBE_API_KEY;

getVideoInfo(videoId, apiKey)
  .then(info => {
    fs.writeFileSync('video_info.json', JSON.stringify(info, null, 2));
    console.log('Video info saved to video_info.json');
  })
  .catch(error => console.error('Error:', error));

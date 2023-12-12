const getNetflixKoreaTrailers = async () => {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=UC0uS501D79t743s63zK7S0A`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer AIzaSyBlA0HQWv2qdP4VJsvM4xZk-ytS1aNYtTE`,
      },
    });
  
    const data = response.data.items[0];
    const videos = data.contentDetails.relatedPlaylists.items.filter((playlist) => playlist.snippet.title === "공식 티저 예고편");
  
    const results = [];
    for (const video of videos) {
      results.push({
        title: video.snippet.title,
        description: video.snippet.description,
        videoId: video.id,
        viewCount: video.statistics.viewCount,
        likeCount: video.statistics.likeCount,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: `https://i1.ytimg.com/vi/${video.id}/hqdefault.jpg `,
      });
    }
  
    results.sort((a, b) => b.snippet.publishedAt - a.snippet.publishedAt);
  
    return results.slice(0, 4);
  };
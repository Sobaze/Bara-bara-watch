namespace Barabara.Api.Services;
using Barabara.Api.Models;
public class YoutubeService
{
    private readonly string apiKey;
    public YoutubeService(HttpClient httpClient, IConfiguration configuration, ILogger<YoutubeService> logger)
    {
        this.httpClient = httpClient;
        this.logger = logger;
        // fix a secret key
        apiKey = configuration["YouTube:ApiKey"] ?? throw new ArgumentNullException("YouTubeApiKey is not configured.");
    }
    public Task<List<SearchResultInfo>> SearchResultAsync(string query)
    {
        
        return Task.FromResult(new List<SearchResultInfo>
        {
            new SearchResultInfo
            {
                VideoId = "1",
                Title = "Stream 1",
                EmbedUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ",
                ThumbnailUrl = "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
                ChannelName = "Stream1",
                IsLive = true,
                ViewCount = "250",
                Description = "this asdasd sdajsdnas sadjshna sadjsknajda sadjansd sadjkan"
            },
            new SearchResultInfo
            {
                VideoId = "2",
                Title = "Stream 2",
                EmbedUrl = "https://www.youtube.com/embed/SonfK-rTHPQ",
                ThumbnailUrl = "https://img.youtube.com/vi/SonfK-rTHPQ/hqdefault.jpg",
                ChannelName = "Stream2",
                IsLive = false,
                ViewCount = "12422"
            },
            new SearchResultInfo
            {
                VideoId = "3",
                Title = "Stream 3",
                EmbedUrl = "https://www.youtube.com/embed/ri35YKhV-ME",
                ThumbnailUrl = "https://img.youtube.com/vi/ri35YKhV-ME/hqdefault.jpg",
                ChannelName = "Stream3",
                IsLive = true,
                ViewCount = "1337"
            },
            new SearchResultInfo
            {
                VideoId = "4",
                Title = "Stream 4",
                EmbedUrl = "https://www.youtube.com/embed/WJOAvttDJ-Q",
                ThumbnailUrl = "https://img.youtube.com/vi/WJOAvttDJ-Q/hqdefault.jpg",
                ChannelName = "Stream4",
                IsLive = true,
                ViewCount = "67"
            },
            new SearchResultInfo
            {
                VideoId = "5",
                Title = "Stream 5",
                EmbedUrl = "https://www.youtube.com/embed/yAtUSvVayM0",
                ThumbnailUrl = "https://img.youtube.com/vi/yAtUSvVayM0/hqdefault.jpg",
                ChannelName = "Stream5",
                IsLive = false,
                ViewCount = "54230"
            },
        });
    }
}
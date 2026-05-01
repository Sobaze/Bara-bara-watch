namespace Barabara.Api.Services;

using Barabara.Api.Models;
using System.Net.Http.Json;
using Microsoft.AspNetCore.WebUtilities;
public class YoutubeService
{
    private readonly string apiKey;
    private readonly HttpClient httpClient;
    private readonly ILogger<YoutubeService> logger;
    
    public YoutubeService(HttpClient httpClient, IConfiguration configuration, ILogger<YoutubeService> logger)
    {
        this.httpClient = httpClient;
        this.logger = logger;
        apiKey = configuration["YouTube:ApiKey"] ?? throw new ArgumentNullException("YouTubeApiKey is not configured.");
    }
    public async Task<List<SearchResultInfo>> SearchAsync(string query, CancellationToken cancellationToken)
    {
        
        var searchString = query.Trim();
        if (string.IsNullOrWhiteSpace(searchString))
        {
            throw new ArgumentException("Search string cannot be null or empty.", nameof(query));
        }
        var url = QueryHelpers.AddQueryString("https://www.googleapis.com/youtube/v3/search", new Dictionary<string, string?>
        {
            ["part"] = "snippet",
            ["q"] = searchString,
            ["type"] = "video",
            ["key"] = apiKey,
            ["maxResults"] = "10"
        });
        var searchRequest = await httpClient.GetAsync(url, cancellationToken);
        if (!searchRequest.IsSuccessStatusCode)
        {
            logger.LogError("Youtube Api request failed with status code {StatusCode} ", searchRequest.StatusCode);
            throw new InvalidOperationException("Failed to retrieve search results from YouTube API.");
        }
        var searchResponseContent = await searchRequest.Content.ReadFromJsonAsync<YoutubeSearchResponse>(cancellationToken);
        if(searchResponseContent == null)
        {
            logger.LogWarning("YouTube API returned an empty response or invalid data.");
            return [];
        }

        var result = new List<SearchResultInfo>();
        foreach (var item in searchResponseContent.Items)
        {
            var videoId = item.Id.VideoId;
            if (string.IsNullOrWhiteSpace(videoId))
            {
                logger.LogWarning("Skipping search result with missing video ID.");
                continue;
            }
            var title = item.Snippet.Title ?? "No Title";
            var channelTitle = item.Snippet.ChannelTitle ?? "Unknown Channel";
            var description = item.Snippet.Description ?? "";
            var thumbnailUrl = item.Snippet.Thumbnails?.High?.Url
                                ?? item.Snippet.Thumbnails?.Medium?.Url
                                ?? item.Snippet.Thumbnails?.Default?.Url
                                ?? $"https://img.youtube.com/vi/{videoId}/hqdefault.jpg";
            

            result.Add(new SearchResultInfo
            {
                VideoId = videoId,
                Title = title,
                EmbedUrl = $"https://www.youtube.com/embed/{videoId}",
                ThumbnailUrl = thumbnailUrl,
                ChannelName = channelTitle,
                Description = description,
                PublishedAt = item.Snippet.PublishedAt?.ToString("O"),
            }); 
        }
        return result;
    }
}
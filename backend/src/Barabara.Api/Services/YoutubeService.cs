namespace Barabara.Api.Services;

using Barabara.Api.Models;
using System.Net.Http.Json;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Extensions.Caching.Memory;

public class YoutubeService
{
    private const string SearchEndpoint = "https://www.googleapis.com/youtube/v3/search";
    private const string VideosEndpoint = "https://www.googleapis.com/youtube/v3/videos";
    private readonly string apiKey;
    private readonly HttpClient httpClient;
    private readonly ILogger<YoutubeService> logger;
    private readonly IMemoryCache cache;


    public YoutubeService(HttpClient httpClient, IConfiguration configuration, ILogger<YoutubeService> logger, IMemoryCache cache)
    {
        this.httpClient = httpClient;
        this.logger = logger;
        apiKey = configuration["YouTube:ApiKey"] ?? throw new ArgumentNullException("YouTubeApiKey is not configured.");
        this.cache = cache;
    }

    public async Task<List<SearchResultInfo>> SearchAsync(string query, CancellationToken cancellationToken)
    {
        var searchString = query.Trim();
        if (string.IsNullOrWhiteSpace(searchString))
        {
            throw new ArgumentException("Search string cannot be null or empty.", nameof(query));
        }

        var cachedKey = BuildCachedKey(searchString);
        var cachedResults = TryGetCachedResults(cachedKey);
        if (cachedResults != null)
        {
            return cachedResults;
        }
        var searchResponseContent = await GetSearchResponseAsync(searchString, cancellationToken);
        var videosDict = await GetVideoDetailsAsync(searchResponseContent, cancellationToken);

        var result = MapSearchResults(searchResponseContent, videosDict);
        cache.Set(cachedKey, result, TimeSpan.FromMinutes(3));

        return result;
    }
    public async Task<SearchResultInfo> GetVideoByInputAsync(string input, CancellationToken cancellationToken)
    {
        var inputString = input;

        var extractedVideoId = YoutubeUrlParser.ExtractVideoId(inputString);
        if (string.IsNullOrWhiteSpace(extractedVideoId))
        {
            logger.LogWarning("Video ID not found");
            throw new ArgumentException("Could not find video with URL");
        }
        var videosUrl = QueryHelpers.AddQueryString(VideosEndpoint, new Dictionary<string, string?>
        {
            ["part"] = "snippet,contentDetails,statistics,liveStreamingDetails",
            ["id"] = extractedVideoId,
            ["key"] = apiKey
        });
        var videosByUrlDetails = await httpClient.GetAsync(videosUrl, cancellationToken);
        if (!videosByUrlDetails.IsSuccessStatusCode)
        {
            logger.LogError("Failed to retrieve video details from the ID from the URL");
            throw new InvalidOperationException("Failed to retrieve video details");
        }
        var videoDetailsContent = await videosByUrlDetails.Content.ReadFromJsonAsync<YoutubeVideosResponse>(cancellationToken);
        var video = videoDetailsContent?.Items.FirstOrDefault();
        if (video == null)
        {
            logger.LogError("YouTube API returned an empty response for the ID from the URL");
            throw new InvalidOperationException("Video not found");
        }
        var mappedResultVideo = MapVideoByInput(video);

        return mappedResultVideo;

    }

    private async Task<YoutubeSearchResponse> GetSearchResponseAsync(string query, CancellationToken cancellationToken)
    {
        var searchString = query;
        var url = QueryHelpers.AddQueryString(SearchEndpoint, new Dictionary<string, string?>
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
            logger.LogError("Youtube API request failed with status code {StatusCode} ", searchRequest.StatusCode);
            throw new InvalidOperationException("Failed to retrieve search results from YouTube API.");
        }
        var searchResponseContent = await searchRequest.Content.ReadFromJsonAsync<YoutubeSearchResponse>(cancellationToken);
        if (searchResponseContent == null)
        {
            logger.LogWarning("YouTube API returned an empty response or invalid data.");
            return new YoutubeSearchResponse();
        }
        return searchResponseContent;
    }

    private async Task<Dictionary<string, YoutubeVideoItem>> GetVideoDetailsAsync(YoutubeSearchResponse searchResponseContent, CancellationToken cancellationToken)
    {
        var videoIds = searchResponseContent.Items.Select(i => i.Id.VideoId).Where(id => !string.IsNullOrWhiteSpace(id)).ToList();
        if (videoIds.Count == 0)
        {
            logger.LogInformation("No valid video IDs found in YouTube API response.");
            return [];
        }
        var videosUrl = QueryHelpers.AddQueryString(VideosEndpoint, new Dictionary<string, string?>
        {
            ["part"] = "snippet,contentDetails,statistics,liveStreamingDetails",
            ["id"] = string.Join(",", videoIds),
            ["key"] = apiKey
        });
        var videosDetails = await httpClient.GetAsync(videosUrl, cancellationToken);
        if (!videosDetails.IsSuccessStatusCode)
        {
            logger.LogError("Failed to retrieve video details from YouTube API. Status code: {StatusCode}", videosDetails.StatusCode);
            return [];
        }
        var videosDetailsContent = await videosDetails.Content.ReadFromJsonAsync<YoutubeVideosResponse>(cancellationToken);
        if (videosDetailsContent == null)
        {
            logger.LogWarning("YouTube API returned an empty response or invalid data for video details.");
            return [];
        }

        var videosDict = videosDetailsContent.Items.ToDictionary(item => item.Id);
        return videosDict;
    }


    private List<SearchResultInfo> MapSearchResults(YoutubeSearchResponse searchResponseContent, Dictionary<string, YoutubeVideoItem> videosDict)
    {
        var result = new List<SearchResultInfo>();
        foreach (var item in searchResponseContent.Items)
        {
            var videoId = item.Id.VideoId;
            if (string.IsNullOrWhiteSpace(videoId))
            {
                logger.LogWarning("Skipping search result with missing video ID.");
                continue;
            }
            var videoItem = videosDict.TryGetValue(videoId, out var video) ? video : null;
            var title = item.Snippet.Title ?? "No Title";
            var channelTitle = item.Snippet.ChannelTitle ?? "Unknown Channel";
            var description = item.Snippet.Description ?? "";
            var thumbnailUrl = item.Snippet.Thumbnails?.High?.Url
                                ?? item.Snippet.Thumbnails?.Medium?.Url
                                ?? item.Snippet.Thumbnails?.Default?.Url
                                ?? $"https://img.youtube.com/vi/{videoId}/hqdefault.jpg";
            var isLive = videoItem?.Snippet.LiveBroadcastContent == "live";
            var viewCount = videoItem?.Statistics?.ViewCount;
            var duration = videoItem?.ContentDetails?.Duration;
            var currentViewers = videoItem?.LiveStreamingDetails?.ConcurrentViewers;

            result.Add(new SearchResultInfo
            {
                VideoId = videoId,
                Title = title,
                EmbedUrl = $"https://www.youtube.com/embed/{videoId}",
                ThumbnailUrl = thumbnailUrl,
                ChannelName = channelTitle,
                Description = description,
                PublishedAt = item.Snippet.PublishedAt?.ToString("O"),
                IsLive = isLive,
                ViewCount = viewCount,
                Duration = duration,
                CurrentViewers = currentViewers
            });
        }
        return result;
    }
    private static SearchResultInfo MapVideoByInput(YoutubeVideoItem video)
    {
        var videoInfo = video.Snippet;
        var thumbnailUrl = videoInfo?.Thumbnails?.High?.Url
                                ?? videoInfo?.Thumbnails?.Medium?.Url
                                ?? videoInfo?.Thumbnails?.Default?.Url
                                ?? $"https://img.youtube.com/vi/{video.Id}/hqdefault.jpg";

        var result = new SearchResultInfo
        {
            VideoId = video.Id,
            Title = videoInfo?.Title ?? "No Title",
            EmbedUrl = $"https://www.youtube.com/embed/{video.Id}",
            ThumbnailUrl = thumbnailUrl,
            ChannelName = videoInfo?.ChannelTitle ?? "Unknown Channel",
            Description = videoInfo?.Description ?? "",
            PublishedAt = videoInfo?.PublishedAt?.ToString("O"),
            IsLive = videoInfo?.LiveBroadcastContent == "live",
            ViewCount = video.Statistics?.ViewCount,
            Duration = video.ContentDetails?.Duration,
            CurrentViewers = video.LiveStreamingDetails?.ConcurrentViewers

        };
        return result;

    }

    private List<SearchResultInfo>? TryGetCachedResults(string cachedKey)
    {
        if (cache.TryGetValue(cachedKey, out List<SearchResultInfo>? cachedResult))
        {
            logger.LogInformation("Returning cached search results for query: {Query}", cachedKey);
            return cachedResult;
        }
        return null;
    }

    private static string BuildCachedKey(string query)
    {
        var searchQuery = query.ToLowerInvariant();
        var cachedKeyString = $"youtube-search:{searchQuery}";
        return cachedKeyString;
    }


}
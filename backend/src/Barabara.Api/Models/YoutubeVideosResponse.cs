namespace Barabara.Api.Models;

public class YoutubeVideosResponse
{
    public List<YoutubeVideoItem> Items { get; set; } = [];
}

public class YoutubeVideoItem
{
    public string Id { get; set; } = "";
    public YoutubeVideoSnippet Snippet { get; set; } = new();
    public YoutubeContentDetails? ContentDetails { get; set; }
    public YoutubeStatistics? Statistics { get; set; }
    public YoutubeLiveStreamingDetails? LiveStreamingDetails { get; set; }
}

public class YoutubeContentDetails
{
    public string? Duration { get; set; }
}

public class YoutubeStatistics
{
    public string? ViewCount { get; set; }
}

public class YoutubeLiveStreamingDetails
{
    public string? ConcurrentViewers { get; set; }
}

public class YoutubeVideoSnippet
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ChannelTitle { get; set; }
    public DateTimeOffset? PublishedAt { get; set; }
    public YoutubeThumbnails? Thumbnails { get; set; }
    public string? LiveBroadcastContent { get; set; }
}
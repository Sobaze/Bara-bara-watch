using System.Text.Json.Serialization;

namespace Barabara.Api.Models;
public class YoutubeSearchResponse
{
    public List<YoutubeSearchItem> Items { get; set; } = [];
}

public class YoutubeSearchItem
{
    public YoutubeSearchId Id { get; set; } = new();
    public YoutubeSnippet Snippet { get; set; } = new();
}

public class YoutubeSearchId
{
    public string? VideoId { get; set; }
}

public class YoutubeSnippet
{
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? ChannelTitle { get; set; }
    public DateTimeOffset? PublishedAt { get; set; }
    public YoutubeThumbnails? Thumbnails { get; set; }
}

public class YoutubeThumbnails
{
    [JsonPropertyName("default")]
    public YoutubeThumbnail? Default { get; set; }
    public YoutubeThumbnail? Medium { get; set; }
    public YoutubeThumbnail? High { get; set; }
}
public class YoutubeThumbnail
{
    public string? Url { get; set; }
}
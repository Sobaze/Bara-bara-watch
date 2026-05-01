namespace Barabara.Api.Models;
public class SearchResultInfo
{
    public string VideoId { get; set; } = "";
    public string Title { get; set; } = "";
    public string EmbedUrl { get; set; } = "";
    public string ThumbnailUrl { get; set; } = "";
    public string ChannelName { get; set; } = "";
    public bool? IsLive { get; set; } 
    public string? ViewCount { get; set; } 
    public string? Description { get; set; } 
    public string? PublishedAt { get; set; } 
    public string? Duration { get; set; } 
}
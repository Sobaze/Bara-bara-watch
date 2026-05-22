namespace Barabara.Api.Services;


using Microsoft.AspNetCore.WebUtilities;

public static class YoutubeUrlParser
{

    public static string ExtractVideoId(string input)
    {

        if (!Uri.TryCreate(input, UriKind.Absolute, out var uri))
        {
            throw new ArgumentException("Input must be a valid YouTube URL. ", nameof(input));
        }
        if (!IsYouTubeHost(uri.Host))
        {
            throw new ArgumentException("Input must be a YouTube URL. ", nameof(input));
        }
        if (uri.Host.Contains("youtu.be", StringComparison.OrdinalIgnoreCase))
        {
            var videoId = uri.AbsolutePath.Trim('/').Split('/').FirstOrDefault();
            return ValidateVideoId(videoId);
        }
        var queryParams = QueryHelpers.ParseQuery(uri.Query);
        if (queryParams.TryGetValue("v", out var videoIdFromQuery))
        {
            return ValidateVideoId(videoIdFromQuery.ToString());
        }

        var pathParts = uri.AbsolutePath.Split('/', StringSplitOptions.RemoveEmptyEntries);
        if (pathParts.Length >= 2 &&
        (pathParts[0].Equals("embed", StringComparison.OrdinalIgnoreCase) ||
        pathParts[0].Equals("live", StringComparison.OrdinalIgnoreCase) ||
        pathParts[0].Equals("shorts", StringComparison.OrdinalIgnoreCase)))
        {
            return ValidateVideoId(pathParts[1]);
        }
        throw new ArgumentException("Could not find a YouTube video ID in the URL");
    }

    private static string ValidateVideoId(string? videoId)
    {
        if (string.IsNullOrWhiteSpace(videoId))
        {
            throw new ArgumentException("YouTube video ID is missing");
        }

        videoId = videoId.Trim();

        if (videoId.Length != 11)
        {
            throw new ArgumentException("YouTube video ID is invalid");
        }

        return videoId;

    }

    private static bool IsYouTubeHost(string host)
    {
        return host.Equals("youtube.com", StringComparison.OrdinalIgnoreCase) ||
           host.Equals("www.youtube.com", StringComparison.OrdinalIgnoreCase) ||
           host.Equals("m.youtube.com", StringComparison.OrdinalIgnoreCase) ||
           host.Equals("youtu.be", StringComparison.OrdinalIgnoreCase);
    }
}
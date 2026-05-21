using Barabara.Api.Services;

namespace Barabara.Api.Tests;

public class YoutubeUrlParserTests
{
    [Fact]
    public void ExtractIdFromWatchUrl()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }

    // this tests for the youtu.be format url
    [Fact]
    public void ExtractIdFromYouTuBeUrl()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://youtu.be/dQw4w9WgXcQ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }

    [Fact]
    public void ExtractIdFromEmbedUrl()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/embed/dQw4w9WgXcQ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }
    [Fact]
    public void ExtractIdFromShortsUrl()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/shorts/dQw4w9WgXcQ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }
    [Fact]
    public void ExtractIdFromLiveUrl()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/live/dQw4w9WgXcQ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }
    [Fact]
    public void ExtractIdFromUrlMdotYoutubeUrl()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://m.youtube.com/watch?v=dQw4w9WgXcQ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }
    [Fact]
    public void ExtractIdFromUrlWithExtraParams()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=42s");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }
    [Fact]
    public void ExtractIdFromUrlWhiteSpaces()
    {
        var urlParseResult = YoutubeUrlParser.ExtractVideoId("   https://www.youtube.com/watch?v=dQw4w9WgXcQ   ");
        string expectedResult = "dQw4w9WgXcQ";
        Assert.Equal(expectedResult, urlParseResult);
    }

    [Fact]
    public void NonYoutubeUrl()
    {
        Assert.Throws<ArgumentException>(() =>
       YoutubeUrlParser.ExtractVideoId("https://example.com/watch?v=dQw4w9WgXcQ"));
    }

    [Fact]
    public void InvalidUrl()
    {
        Assert.Throws<ArgumentException>(() =>
        YoutubeUrlParser.ExtractVideoId("not a url")
        );
    }

    [Fact]
    public void EmptyUrl()
    {
        Assert.Throws<ArgumentException>(() => YoutubeUrlParser.ExtractVideoId(""));
    }
    [Fact]
    public void MissingVideoId()
    {
        Assert.Throws<ArgumentException>(() => YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/watch"));
    }

    [Fact]
    public void InvalidVideoId()
    {
        Assert.Throws<ArgumentException>(() => YoutubeUrlParser.ExtractVideoId("https://www.youtube.com/watch?v=invalid_id"));
    }

}
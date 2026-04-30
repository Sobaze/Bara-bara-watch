namespace Barabara.Api.Controllers;

using Microsoft.AspNetCore.Mvc;
using Barabara.Api.Services;

[ApiController]
[Route("api/youtube")]
public class YoutubeController : ControllerBase
{
    private readonly YoutubeService youtubeService;
    public YoutubeController(YoutubeService youtubeService)
    {
        this.youtubeService = youtubeService;
    }

    [HttpGet("search")]
    public async Task<IActionResult> SearchResultAsync([FromQuery] string q)
    {
        if (string.IsNullOrWhiteSpace(q))
        {
            return BadRequest("Query parameter 'q' is required.");
        }
        // Implementation for searching YouTube videos
        var results = await youtubeService.SearchResultAsync(q);
        return Ok(results);
    }
}
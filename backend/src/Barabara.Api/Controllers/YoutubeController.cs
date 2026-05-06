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
    public async Task<IActionResult> SearchAsync([FromQuery] string q, CancellationToken cancellationToken)
    {
        if (string.IsNullOrWhiteSpace(q))
        {
            return BadRequest("Query parameter 'q' is required.");
        }
        try
        {
            var results = await youtubeService.SearchAsync(q, cancellationToken);
            return Ok(results);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (InvalidOperationException ex)
        {
            return StatusCode(502, ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(500, "An unexpected error occurred. Please try again later.");
        }
    }
}
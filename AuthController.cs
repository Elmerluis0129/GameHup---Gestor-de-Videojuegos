using Microsoft.AspNetCore.Mvc;
using FirebaseAdmin.Auth;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] string token)
    {
        try
        {
            var jwtToken = await _authService.LoginWithFirebase(token);
            return Ok(new { Token = jwtToken });
        }
        catch
        {
            return Unauthorized();
        }
    }
}

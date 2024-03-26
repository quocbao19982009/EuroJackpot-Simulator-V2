using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;

namespace API.Endpoints.Users.PostLogin;

public class Endpoint : Endpoint<Request>
{
    public override void Configure()
    {
        Post("/api/users/login");
        Description(b => b
        .Accepts<Request>("application/json"));
        Summary(s =>
        {
            s.Summary = "Login as user";
        });

        AllowAnonymous();
    }
    private readonly ITokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;

    public Endpoint(ITokenService tokenService, UserManager<AppUser> userManager)
    {
        _tokenService = tokenService;
        _userManager = userManager;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var user = await _userManager.FindByEmailAsync(req.Email);
        if (user == null)
        {
            AddError("Invalid email or password");
            await SendErrorsAsync(401);
            return;
        }

        var result = await _userManager.CheckPasswordAsync(user, req.Password);
        if (!result)
        {
            AddError("Invalid email or password");
            await SendErrorsAsync(401);
            return;
        }

        var userDto = user.ToUserDto();
        var token = await _tokenService.CreateToken(user);
        userDto.Token = token;

        await SendOkAsync(userDto);
    }

}

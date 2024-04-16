using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

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
    private readonly IUserRepository _userRepository;
    private readonly ITokenService _tokenService;
    private readonly UserManager<AppUser> _userManager;

    public Endpoint(ITokenService tokenService, UserManager<AppUser> userManager, IUserRepository userRepository)
    {
        _tokenService = tokenService;
        _userManager = userManager;
        _userRepository = userRepository;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var userExits = await _userManager.FindByEmailAsync(req.Email);

        if (userExits == null)
        {
            AddError("Invalid email or password");
            await SendErrorsAsync(401);
            return;
        }

        var result = await _userManager.CheckPasswordAsync(userExits, req.Password);
        if (!result)
        {
            AddError("Invalid email or password");
            await SendErrorsAsync(401);
            return;
        }

        var user = await _userRepository.GetUserByIdAsync(userExits.Id);

        await SendOkAsync(user.ToUserDto());
    }

}

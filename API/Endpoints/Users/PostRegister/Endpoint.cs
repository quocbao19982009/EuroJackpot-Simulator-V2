using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;

namespace API.Endpoints.Users.PostRegister;

public class Endpoint : Endpoint<Request>
{
    public override void Configure()
    {
        Post("/api/users/register/");
        Description(b => b
        .Accepts<Request>("application/json"));
        Summary(s =>
        {
            s.Summary = "Register a new user";
        });

        AllowAnonymous();
    }

    private readonly UserManager<AppUser> _userManager;
    private readonly ITokenService _tokenService;

    public Endpoint(UserManager<AppUser> userManager, ITokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        if (await _userManager.FindByEmailAsync(req.Email) != null)
        {
            AddError("Email is already taken");
            await SendErrorsAsync(400);
            return;
        }

        var newUser = new AppUser
        {
            UserName = req.Email,
            Email = req.Email,
            Balance = 1000
        };

        var result = await _userManager.CreateAsync(newUser, req.Password);


        if (!result.Succeeded)
        {
            AddError(string.Join(", ", result.Errors.Select(e => e.Description)));
            await SendErrorsAsync(400, ct);
            return;
        }

        var roleResult = await _userManager.AddToRoleAsync(newUser, "Member");

        if (!roleResult.Succeeded)
        {
            throw new Exception("Failed to add role to user");
        }

        var newUserDto = newUser.ToUserDto();
        newUserDto.Token = await _tokenService.CreateToken(newUser);

        await SendOkAsync(newUserDto);
    }
}
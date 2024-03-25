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
        // UserManager is kinda repository pattern for user
        _userManager = userManager;
        _tokenService = tokenService;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        // Check Emails
        // if (await _userManager.FindByEmailAsync(req.Email) != null)
        // {
        //     await SendErrorsAsync(400);
        //     return;
        // }

        // Create user

        var newUser = new AppUser
        {
            // UserName has to be unique
            // User name = req.Name + random numnber
            UserName = req.Email,
            Email = req.Email
        };

        var result = await _userManager.CreateAsync(newUser, req.Password);

        if (!result.Succeeded)
        {
            // Send all the error messages
            AddError(string.Join(", ", result.Errors.Select(e => e.Description)));
            await SendErrorsAsync(400, ct);
            return;
        }

        // Add role
        // var roleResult = await _userManager.AddToRoleAsync(newUser, "Member");

        // if (!roleResult.Succeeded)
        // {
        //     throw new Exception("Failed to add role to user");
        // }

        await SendOkAsync(newUser.ToUserDto());
    }
}
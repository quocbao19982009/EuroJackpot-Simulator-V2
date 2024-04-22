using API.DTOs;
using API.Entities;
using API.Extensions;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Users.GetUser;

public class Endpoint : EndpointWithoutRequest<UserDto>
{
    private UserManager<AppUser> _userManager;


    public override void Configure()
    {
        Get("/api/users/me");
        Summary(s =>
        {
            s.Description = "This api is to get user by token";
            s.Summary = "Get user by Token";
        });

    }

    public Endpoint(UserManager<AppUser> userManager)
    {
        _userManager = userManager;

    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetUserId();

        var user = await _userManager.Users
        .Include(user => user.Games)
        .Include(user => user.BalanceTransactions)
        .Where(user => user.Id == userId).FirstOrDefaultAsync();
        if (user == null)
        {
            AddError("User not found");
            await SendNotFoundAsync();
            return;
        }

        var userDto = user.ToUserDto();
        await SendOkAsync(userDto);

    }
}
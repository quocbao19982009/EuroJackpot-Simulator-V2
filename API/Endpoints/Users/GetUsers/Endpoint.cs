using API.DTOs;
using API.Entities;
using API.Extensions;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Users.GetUsers;

public class Endpoint : EndpointWithoutRequest<List<UserDto>>
{
    private UserManager<AppUser> _userManager;

    public override void Configure()
    {
        Get("/api/users/all");
        Summary(s =>
        {
            s.Description = "This api is for user to get all users";
            s.Summary = "Get all users";
        });
        // If remove this line, the api will require token
        // AllowAnonymous();
    }

    public Endpoint(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var users = await _userManager.Users
        .Include(user => user.Games)
        .ThenInclude(game => game.ResultLottery)
        .Include(user => user.Games)
        .ThenInclude(game => game.LotteriesPlayed).ToListAsync();

        var usersDto = users.Select(user => user.ToUserDto()).ToList();

        await SendOkAsync(usersDto);

    }
}
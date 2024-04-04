using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Users.GetUser;

public class Endpoint : EndpointWithoutRequest<UserDto>
{
    private UserManager<AppUser> _userManager;
    private readonly IBalanceTransactionRepository _balanceTransactionRepository;

    public override void Configure()
    {
        Get("/api/users/me");
        Summary(s =>
        {
            s.Description = "This api is to get user by token";
            s.Summary = "Get user by Token";
        });
        // If remove this line, the api will require token
        // AllowAnonymous();
    }

    public Endpoint(UserManager<AppUser> userManager, IBalanceTransactionRepository balanceTransactionRepository)
    {
        _userManager = userManager;
        _balanceTransactionRepository = balanceTransactionRepository;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetUserId();

        var user = await _userManager.Users
        .Include(user => user.Games)
       .Where(user => user.Id == userId).FirstOrDefaultAsync();

        var userDto = user.ToUserDto();

        userDto.TotalGames = user.Games.Count();
        userDto.TotalWinnings = user.Games.Sum(game => game.TotalWinning);

        var transactions = await _balanceTransactionRepository.GetTransactionsByUserIdAsync(user.Id);

        userDto.TotalTopUps = transactions.Sum(transaction => transaction.Amount);

        await SendOkAsync(userDto);

    }
}
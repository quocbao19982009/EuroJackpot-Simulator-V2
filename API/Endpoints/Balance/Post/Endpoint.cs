using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;

namespace API.Endpoints.Balance.Post;
public class Endpoint : Endpoint<Request>
{
    private UserManager<AppUser> _userManager;
    private readonly IBalanceTransactionRepository _balanceTransactionRepository;

    public override void Configure()
    {
        Post("/api/balance");
        Summary(s =>
        {
            s.Summary = "Add balance to user account";
            s.Description = "This api is for user to add balance to their account";
        });
    }

    public Endpoint(UserManager<AppUser> userManager, IBalanceTransactionRepository balanceTransactionRepository)
    {

        _userManager = userManager;
        _balanceTransactionRepository = balanceTransactionRepository;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {

        var userId = User.GetUserId();
        var user = await _userManager.FindByIdAsync(userId.ToString());

        user.Balance += req.Amount;

        var result = await _userManager.UpdateAsync(user);

        if (!result.Succeeded)
        {
            AddError("Failed to update the balance");
            await SendErrorsAsync(500);
        }

        var transaction = new BalanceTransaction
        {
            Amount = req.Amount,
            UserId = user.Id
        };

        await _balanceTransactionRepository.AddTransactionAsync(transaction);

        var success = await _balanceTransactionRepository.SaveAllAsync();
        if (!success)
        {
            AddError("Failed to save the transaction");
            await SendErrorsAsync(500);
        }

        var userDto = user.ToUserDto();
        await SendOkAsync(userDto);
    }
}
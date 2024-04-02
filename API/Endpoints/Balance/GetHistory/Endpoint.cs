using API.Extensions;
using API.Interfaces;
using FastEndpoints;

namespace API.Endpoints.Balance.GetHistory;

public class Endpoint : EndpointWithoutRequest
{
    private readonly IBalanceTransactionRepository _balanceTransactionRepository;
    public override void Configure()
    {
        Get("/api/balance/history");
        Description(b => b
            .WithSummary("Get all balance transaction history")
            .WithDescription("This api is for user to get all the balance transaction history from the server"));
        // AllowAnonymous();
    }
    public Endpoint(IBalanceTransactionRepository balanceTransactionRepository)
    {
        _balanceTransactionRepository = balanceTransactionRepository;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetUserId();
        var transactions = await _balanceTransactionRepository.GetTransactionsByUserIdAsync(userId);

        var transactionsList = transactions.ToList();

        await SendOkAsync(transactionsList);
    }
}

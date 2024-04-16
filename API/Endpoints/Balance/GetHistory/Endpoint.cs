using API.Extensions;
using API.Interfaces;
using FastEndpoints;

namespace API.Endpoints.Balance.GetHistory;

public class Endpoint : EndpointWithoutRequest
{
    private readonly IUserRepository _userRepository;
    public override void Configure()
    {
        Get("/api/balance/history");
        Description(b => b
            .WithSummary("Get all balance transaction history")
            .WithDescription("This api is for user to get all the balance transaction history from the server"));
    }
    public Endpoint(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var userId = User.GetUserId();

        var user = await _userRepository.GetUserByIdAsync(userId);

        if (user == null)
        {
            await SendNotFoundAsync();
            return;
        }

        var transactionsList = user.BalanceTransactions.Select(transaction => transaction.ToDto()).ToList();

        await SendOkAsync(transactionsList);
    }
}

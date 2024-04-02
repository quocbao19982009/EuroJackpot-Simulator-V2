using API.Extensions;
using API.Interfaces;
using FastEndpoints;

namespace API.Endpoints.Games.GetHistory;

public class Endpoint : EndpointWithoutRequest<Response>
{
    private readonly IGameService _gameService;

    public override void Configure()
    {
        Get("/api/games/history");
        Description(b => b
            .WithSummary("Get all games history")
            .WithDescription(" This api is for user to get all the games history from the server"));
        // AllowAnonymous();
    }

    public Endpoint(IGameService gameService)
    {
        _gameService = gameService;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        // How to get the UserID from Authorization Header
        var userId = User.GetUserId();
        var games = await _gameService.GetGamesByUserIdAsync(userId);

        if (games == null)
        {
            throw new Exception("Failed to get the games");
        }

        var response = new Response
        {
            Games = games.ToList()
        };

        await SendOkAsync(response);
    }
}
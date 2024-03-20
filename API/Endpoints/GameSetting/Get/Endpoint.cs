using FastEndpoints;
using API.Config;
using Microsoft.Extensions.Options;

namespace API.Endpoints.GameSetting.Get;
public class Endpoint : EndpointWithoutRequest
{

    private readonly GameSettings _gameSetting;
    public override void Configure()
    {
        Get("/api/gamesetting");
        Summary(s =>
         {
             s.Summary = "Get the game setting";
             s.Description = "This api is for user to get the game setting";
         });
        AllowAnonymous();

    }

    public Endpoint(IOptions<GameSettings> settings)
    {
        _gameSetting = settings.Value;
    }

    public override async Task HandleAsync(CancellationToken ct)
    {
        var response = new Response
        {
            gameSettings = _gameSetting
        };

        await SendOkAsync(response);
    }
}

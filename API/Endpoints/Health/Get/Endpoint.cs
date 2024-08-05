
using FastEndpoints;

namespace API.Endpoints.Health.Get;

public class Endpoint : EndpointWithoutRequest
{


    public override void Configure()
    {
        Get("/api/health");
        Description(b => b
            .WithSummary("Get health status")
            .WithDescription("This api is for user to get the health status of the server"));
        AllowAnonymous();

    }
    public Endpoint()
    {

    }


    public override async Task HandleAsync(CancellationToken ct)
    {

        await SendOkAsync();
    }
}

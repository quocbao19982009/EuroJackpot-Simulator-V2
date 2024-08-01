
using FastEndpoints;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Pomelo.EntityFrameworkCore.MySql.Storage.Internal;

namespace API.Endpoints.Health.Get;

public class Endpoint : EndpointWithoutRequest<Response>
{
    private readonly HealthCheckService _healthCheckService;
    private readonly IConfiguration _configuration;

    public override void Configure()
    {
        Get("/api/healthCheck");
        Description(b => b
            .WithSummary("Get health status")
            .WithDescription("This api is for user to get the health status of the server"));
        AllowAnonymous();

    }
    public Endpoint(HealthCheckService healthCheckService, IConfiguration configuration)
    {
        _healthCheckService = healthCheckService;
        _configuration = configuration;
    }


    public override async Task HandleAsync(CancellationToken ct)
    {
        var report = await _healthCheckService.CheckHealthAsync(ct);
        var databaseHealthCheck = report.Entries.FirstOrDefault(e => e.Key == "Database Health Check");
        // var connectionStringBuilder = new MySqlConnectionSettings(_configuration.GetConnectionString("DefaultConnection"));

        var response = new Response
        {
            isBackendHealthy = true,
            isDatabaseHealthy = databaseHealthCheck.Key != null && databaseHealthCheck.Value.Status == HealthStatus.Healthy,
            // DatabaseServer = connectionStringBuilder.DataSource
        };

        await SendOkAsync(response);
    }
}

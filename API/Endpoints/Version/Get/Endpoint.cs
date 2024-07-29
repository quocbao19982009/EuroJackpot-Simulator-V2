using FastEndpoints;
using System.Text.Json;

namespace API.Endpoints.Version.Get
{
    public class Endpoint : EndpointWithoutRequest
    {

        public override void Configure()
        {
            Get("/api/version");
            Description(b => b
                .WithSummary("Get app version"));

            AllowAnonymous();
        }
        private readonly IWebHostEnvironment _env;

        public Endpoint(IWebHostEnvironment env)
        {
            _env = env;
        }

        public override async Task HandleAsync(CancellationToken ct = default)
        {
            var filePath = Path.Combine(_env.ContentRootPath, "version.txt");
            var versionData = await File.ReadAllTextAsync(filePath, ct);

            await SendAsync(new
            {
                version = versionData.Trim()
            });
        }
    }

}
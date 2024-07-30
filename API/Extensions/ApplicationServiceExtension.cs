using API.Config;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace API.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {

        var connectionString = config.GetConnectionString("DefaultConnection") ?? throw new ArgumentNullException("DefaultConnection", "DefaultConnection is not set in configuration");
        ;

        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });

        services.AddHealthChecks().AddSqlServer(connectionString, name: "Database Health Check");

        // Config
        services.Configure<GameSettingsOptions>(config.GetSection("GameSettings"));
        // Repositories
        services.AddScoped<IUserRepository, UserRepository>();
        // Services
        services.AddScoped<IGameService, GameService>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IUnitOfWork, UnitOfWork>();

        return services;
    }
}
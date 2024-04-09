using API.Config;
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
    {
        services.AddDbContext<DataContext>(options =>
        {
            options.UseSqlite(config.GetConnectionString("DefaultConnection"));
        });

        // Config
        services.Configure<GameSettingsOptions>(config.GetSection("GameSettings"));
        // Repositories
        services.AddScoped<ILotteriesRepository, LotteriesRepository>();
        services.AddScoped<IGamesRepository, GamesRepository>();
        services.AddScoped<IBalanceTransactionRepository, BalanceTransactionRepository>();
        services.AddScoped<IUserRepository, UserRepository>();
        // Services
        services.AddScoped<IGameService, GameService>();
        services.AddScoped<ITokenService, TokenService>();

        return services;
    }
}
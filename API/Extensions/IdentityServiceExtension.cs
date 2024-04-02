
using System.Text;
using API.Data;
using API.Endpoints.Games.PostGame;
using API.Entities;
using FastEndpoints;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace API.Extensions;

public static class IdentityServiceExtensions
{
    //
    public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config)
    {
        // Add password policy
        services.AddIdentityCore<AppUser>(opt =>
        {
            opt.User.RequireUniqueEmail = true;
            opt.Password.RequireNonAlphanumeric = false;
            opt.Password.RequireDigit = false;
            opt.Password.RequireLowercase = false;
            opt.Password.RequireUppercase = false;
            opt.Password.RequiredLength = 4;

        })
        .AddRoles<AppRole>()
        .AddRoleManager<RoleManager<AppRole>>()
        .AddEntityFrameworkStores<DataContext>();

        var tokenKey = config["TokenKey"];
        if (tokenKey == null)
        {
            throw new ArgumentNullException("TokenKey", "TokenKey is not set in configuration");
        }

        // Add authentication setting
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey)),
                ValidateIssuer = false,
                ValidateAudience = false
            };
            // If authenticaiton fail customize the response
            options.Events = new JwtBearerEvents
            {
                OnChallenge = context =>
                {
                    context.HandleResponse();

                    var validationFailures = new List<FluentValidation.Results.ValidationFailure>
                    {
                        new FluentValidation.Results.ValidationFailure("Token","You are not authorized")
                    };
                    var validationCtx = new ErrorResponse(validationFailures, 401);

                    context.Response.ContentType = "application/json";
                    context.Response.StatusCode = 401;
                    return context.Response.WriteAsJsonAsync(validationCtx);
                }
            };

        });

        // Adding Authorization policy
        // Role name is case sensitive
        services.AddAuthorization(opt =>
        {
            opt.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
        });

        return services;
    }
}
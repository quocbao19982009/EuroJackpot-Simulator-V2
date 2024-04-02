using API.Config;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using API.Services;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configuration
IConfiguration configuration = builder.Configuration;

// TODO: Consider moving the these services to a separate file
// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.ToString());
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        BearerFormat = "JWT"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement{
        {
            new OpenApiSecurityScheme{
                Reference = new OpenApiReference{
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[]{}
        }
    });

});
builder.Services.AddFastEndpoints(); // Add FastEndpoints
builder.Services.AddCors(); // Add services for CORS

// Application services
builder.Services.AddApplicationServices(configuration);
// Identity services
builder.Services.AddIdentityServices(configuration);

// Configure GameSettings using options pattern
builder.Services.Configure<GameSettings>(configuration.GetSection("GameSettings"));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder
    .WithOrigins("http://localhost:5173")
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials()
    ); // Set up cors when we have FE

app.UseAuthentication();
app.UseAuthorization();
app.UseFastEndpoints(); // Use FastEndpoints

// Using the scope to get the services
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;
try
{
    var context = services.GetRequiredService<DataContext>();
    var userManger = services.GetRequiredService<UserManager<AppUser>>();
    var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
    // Update the base url
    await context.Database.MigrateAsync();
    await Seed.SeedUsers(userManger, roleManager);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurred during migration");
}

app.Run();

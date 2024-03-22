using API.Config;
using API.Data;
using API.Extensions;
using API.Interfaces;
using API.Services;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

var builder = WebApplication.CreateBuilder(args);

// Configuration
IConfiguration configuration = builder.Configuration;

// TODO: Consider moving the these services to a separate file
// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.CustomSchemaIds(type => type.ToString());
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

app.UseFastEndpoints(); // Use FastEndpoints



app.Run();

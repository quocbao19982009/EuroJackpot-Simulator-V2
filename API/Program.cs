using API.Data;
using API.Interfaces;
using API.Services;
using FastEndpoints;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// TODO: Consider moving the these services to a separate file
// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddFastEndpoints(); // Add FastEndpoints

//Database
builder.Services.AddDbContext<DataContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// Adding the repository with services code here
builder.Services.AddScoped<ILotteriesRepository, LotteriesRepository>();
builder.Services.AddScoped<IGamesRepository, GamesRepository>();

//  Services
builder.Services.AddScoped<IGameService, GameService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseFastEndpoints(); // Use FastEndpoints

app.Run();

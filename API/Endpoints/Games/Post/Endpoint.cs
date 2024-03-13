using FastEndpoints;
using API.Endpoints.Games.Post;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http.HttpResults;
using API.DTOs;
using API;
using API.Data;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly IGamesRepository _gamesRepository;
    private readonly ILotteriesRepository _lotteriesRepository;
    private readonly DataContext _dataContext;

    public override void Configure()
    {
        Post("/api/games");
        Description(b => b
        .Accepts<Request>("application/json"));
        Summary(s =>
        {
            s.Summary = "Post a new lottery into database";
            s.Description = "TODO: This api is for user to sent their lottery ticket array to the server and the server will response with the server winning ticket";
        });

        AllowAnonymous();
    }

    public Endpoint(IGamesRepository gamesRepository, ILotteriesRepository lotteriesRepository, DataContext dataContext)
    {
        _gamesRepository = gamesRepository;
        _lotteriesRepository = lotteriesRepository;
        _dataContext = dataContext;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var tickets = req.tickets;
        // Create the game
        var game = new Game();

        // Transform each LotteryInput to Lottery and add them to LotteriesPlayed
        var lotteries = tickets.Select(ticket => new Lottery(ticket)).ToList();
        game.LotteriesPlayed.AddRange(lotteries);

        // Add game to the database and save changes
        _dataContext.Games.Add(game);
        await _dataContext.SaveChangesAsync();

        var winningLottery = new Lottery
        {
            Game = game,  // Assign the game to the winning lottery
            GameId = game.Id
        };

        game.ResultLottery = winningLottery;  // Assign the winning lottery to the game

        // Add winningLottery to the database and save changes
        _dataContext.Lotteries.Add(winningLottery);
        await _dataContext.SaveChangesAsync();

        // Return the response
        var response = new Response
        {
            GameResult = game.ToGameDto()
        };

        await SendOkAsync(response);

    }


}

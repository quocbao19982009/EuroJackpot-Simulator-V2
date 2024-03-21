using API.Config;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.Extensions.Options;

namespace API.Services;

public class GameService : IGameService
{
    // Todo: Do I need to config it? Probably by using a config file
    private readonly GameSettings _gameSettings;
    private readonly IGamesRepository _gamesRepository;

    public GameService(IGamesRepository gamesRepository, IOptions<GameSettings> settings)
    {
        _gamesRepository = gamesRepository;
        _gameSettings = settings.Value;  // Access the actual settings object
    }

    public async Task<GameDto> CreateGameAsync(IEnumerable<LotteryInput> tickets)
    {

        // Create the game
        var game = new Game();

        // Transform each LotteryInput to Lottery and add them to LotteriesPlayed
        var lotteries = tickets.Select(ticket => new Lottery(ticket)).ToList();
        game.LotteriesPlayed.AddRange(lotteries);

        var winningLottery = new Lottery();

        game.ResultLottery = winningLottery;  // Assign the winning lottery to the game

        // Calculate the winning amount
        game.TotalWinning = lotteries.Sum(l => LotteryHelpers.CalculateWinningLottery(l, winningLottery));
        game.TotalCost = lotteries.Count * _gameSettings.TicketPrice;

        // Add game to the database and save changes
        _gamesRepository.AddGame(game);
        var result = await _gamesRepository.SaveAllAsync();

        if (!result)
        {
            throw new Exception("Failed to save the game");

        }

        return game.ToGameDto();
    }

    public async Task<IEnumerable<GameDto>> GetAllGamesAsync()
    {
        var games = await _gamesRepository.GetAllGamesAsync();
        Console.WriteLine(games.ToString());
        return games.Select(g => g.ToGameDto());

    }
}
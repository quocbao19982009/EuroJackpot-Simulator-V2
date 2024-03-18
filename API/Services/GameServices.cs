using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Services;

public class GameService : IGameService
{
    // Todo: Do I need to config it? Probably by using a config file
    private readonly int _ticketPrice = 2;
    private readonly int _primaryNumberRange = 50;
    private readonly int _secondaryNumberRange = 5;
    private readonly int _primaryNumberCount = 10;
    private readonly int _secondaryNumberCount = 2;
    private readonly IGamesRepository _gamesRepository;

    public GameService(IGamesRepository gamesRepository)
    {
        _gamesRepository = gamesRepository;
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
        game.TotalCost = lotteries.Count * _ticketPrice;

        // Add game to the database and save changes
        _gamesRepository.AddGame(game);
        var result = await _gamesRepository.SaveAllAsync();

        if (!result)
        {
            throw new Exception("Failed to save the game");

        }

        return game.ToGameDto();
    }

}
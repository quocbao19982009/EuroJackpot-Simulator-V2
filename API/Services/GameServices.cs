using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Services;

public class GameService : IGameService
{

    private readonly IGamesRepository _gamesRepository;

    public GameService(IGamesRepository gamesRepository)
    {
        _gamesRepository = gamesRepository;
    }

    public async Task<GameDto> CreateGameAsync(IEnumerable<LotteryInput> tickets)
    {
        // TODO: This ticketPrice should be moved to the configuration
        var ticketPrice = 2;
        // Create the game
        var game = new Game();

        // Transform each LotteryInput to Lottery and add them to LotteriesPlayed
        var lotteries = tickets.Select(ticket => new Lottery(ticket)).ToList();
        game.LotteriesPlayed.AddRange(lotteries);

        var winningLottery = new Lottery();

        game.ResultLottery = winningLottery;  // Assign the winning lottery to the game

        // Calculate the winning amount
        game.TotalWinning = lotteries.Sum(l => LotteryHelpers.CalculateWinningLottery(l, winningLottery));
        game.TotalCost = lotteries.Count * ticketPrice;

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
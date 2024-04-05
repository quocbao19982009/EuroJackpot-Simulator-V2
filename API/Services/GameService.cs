using API.Config;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Services;

public class GameService : IGameService
{
    // TODO: Clean up the logic for the createGameAsync
    // Todo: Do I need to config it? Probably by using a config file
    private readonly GameSettingsOptions _gameSettings;
    private readonly IGamesRepository _gamesRepository;
    private readonly UserManager<AppUser> _userManager;

    public GameService(IGamesRepository gamesRepository, IOptions<GameSettingsOptions> settings, UserManager<AppUser> userManager)
    {
        _gamesRepository = gamesRepository;
        _gameSettings = settings.Value;  // Access the actual settings object
        _userManager = userManager;
    }

    public async Task<GameDto> CreateGameAsync(GameType gameType, IEnumerable<LotteryInput> tickets, int UserId)
    {

        GameSettings gameSettings = gameType switch
        {
            GameType.Eurojackpot => _gameSettings.Eurojackpot,
            GameType.Lotto => _gameSettings.Lotto,
            _ => throw new Exception("Invalid game type")
        };

        var ticketPrice = gameSettings.TicketPrice;

        var primaryNumberCount = gameSettings.PrimaryNumberCount;
        var primaryNumberRange = gameSettings.PrimaryNumberRange;

        var secondaryNumberCount = gameSettings.SecondaryNumberCount;
        var secondaryNumberRange = gameSettings.SecondaryNumberRange;

        // TODO: Update the Error message
        var user = await _userManager.FindByIdAsync(UserId.ToString());
        // Create the game
        var game = new Game();
        game.User = user;

        // Validate the tickets
        tickets.ToList().ForEach(ticket =>
        {
            LotteryHelpers.ValidateLotteryInput(ticket, gameSettings);
        });

        // Transform each LotteryInput to Lottery and add them to LotteriesPlayed
        var lotteries = tickets.Select(ticket => new Lottery(ticket)).ToList();
        game.LotteriesPlayed.AddRange(lotteries);

        // Create the winning lottery
        var winningLottery = new Lottery(primaryNumberRange, secondaryNumberRange, primaryNumberCount, secondaryNumberCount);

        game.ResultLottery = winningLottery;  // Assign the winning lottery to the game

        // Calculate the winning amount
        var totalWinning = lotteries.Sum(l => LotteryHelpers.CalculateWinningLottery(gameType, l, winningLottery));
        game.TotalWinning = totalWinning;
        var totalCost = lotteries.Count * ticketPrice;
        game.TotalCost = totalCost;

        if (user.Balance < totalCost)
        {
            throw new Exception("Insufficient balance");
        }
        // Calculate the profit
        user.Balance = user.Balance + totalWinning - totalCost;

        // Add game to the database and save changes
        _gamesRepository.AddGame(game);
        user.Games.Add(game);
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

        return games.Select(g => g.ToGameDto());

    }

    public async Task<IEnumerable<GameDto>> GetGamesByUserIdAsync(int userId)
    {
        var games = await _gamesRepository.GetGamesByUserIdAsync(userId);

        return games.Select(g => g.ToGameDto());
    }
}
using API.Config;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Exceptions.Game;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Options;

namespace API.Services;

public class GameService : IGameService
{
    private readonly GameSettingsOptions _gameSettings;
    private readonly IGamesRepository _gamesRepository;
    private readonly IUserRepository _userRepository;

    public GameService(IGamesRepository gamesRepository, IOptions<GameSettingsOptions> settings, IUserRepository userRepository)
    {
        _gamesRepository = gamesRepository;
        _gameSettings = settings.Value;
        _userRepository = userRepository;
    }

    private GameSettings GetGameSettings(GameType gameType)
    {
        return gameType switch
        {
            GameType.Eurojackpot => _gameSettings.Eurojackpot,
            GameType.Lotto => _gameSettings.Lotto,
            _ => throw new InvalidGameTypeException()
        };
    }

    public Game CreateGame(GameType gameType, IEnumerable<LotteryInput> ticketInputs, AppUser userInput)
    {
        var game = new Game();

        var gameSettings = GetGameSettings(gameType);
        ValidateTickets(ticketInputs, gameSettings);

        var totalCost = CalculateTotalCost(ticketInputs, gameSettings.TicketPrice);

        var winningLottery = new Lottery(gameSettings.PrimaryNumberRange, gameSettings.SecondaryNumberRange, gameSettings.PrimaryNumberCount, gameSettings.SecondaryNumberCount);

        var playLottery = ticketInputs.Select(ticketInput => new Lottery(ticketInput)).ToList();

        var winnings = CalculateWinnings(winningLottery, playLottery, gameType);

        game.User = userInput;
        game.LotteriesPlayed.AddRange(playLottery);
        game.ResultLottery = winningLottery;
        game.TotalCost = totalCost;

        return game;
    }

    public async Task<GameDto> CreateGameAsync(GameType gameType, IEnumerable<LotteryInput> tickets, int UserId)
    {
        var user = await _userRepository.GetUserByIdAsync(UserId);
        var game = CreateGame(gameType, tickets, user);
        user.Games.Add(game);
        UpdateUserBalance(user, game.TotalCost, game.TotalWinning);
        var result = await _gamesRepository.SaveAllAsync();
        if (!result)
        {
            throw new GameSaveFailException();
        }
        return game.ToGameDto();
    }

    private void ValidateTickets(IEnumerable<LotteryInput> tickets, GameSettings gameSettings)
    {
        tickets.ToList().ForEach(ticket =>
        {
            LotteryHelpers.ValidateLotteryInput(ticket, gameSettings);
        });
    }

    private int CalculateTotalCost(IEnumerable<LotteryInput> tickets, int ticketPrice)
    {
        return tickets.Count() * ticketPrice;
    }

    private decimal CalculateWinnings(Lottery winningLottery, List<Lottery> lotteries, GameType gameType)
    {
        var totalWinning = lotteries.Sum(l => LotteryHelpers.CalculateWinningLottery(gameType, l, winningLottery));
        return totalWinning;
    }

    private void UpdateUserBalance(AppUser user, decimal totalCost, decimal winnings)
    {
        user.Balance -= totalCost;
        user.Balance += winnings;
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
using API.DTOs;
using API.Entities;

public static class GameExtensions
{
    public static GameDto ToGameDto(this Game game)
    {
        return new GameDto
        {
            Id = game.Id,
            Date = game.Date,
            ResultLottery = game.ResultLottery != null ? game.ResultLottery.ToLotteryDto() : null,
            LotteriesPlayed = game.LotteriesPlayed.Select(l => l.ToLotteryDto()).ToList(),
            TotalCost = game.TotalCost,
            TotalWinning = game.TotalWinning
        };
    }
}

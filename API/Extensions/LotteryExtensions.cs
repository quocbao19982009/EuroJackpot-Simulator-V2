using API.DTOs;
using API.Entities;

public static class LotteryExtensions
{
    public static LotteryDto ToLotteryDto(this Lottery lottery)
    {
        return new LotteryDto
        {
            Id = lottery.Id,
            Date = lottery.Date,
            PrimaryNumbers = [.. lottery.PrimaryNumber.OrderBy(n => n)],
            SecondaryNumbers = [.. lottery.SecondaryNumber.OrderBy(n => n)]
        };
    }
}
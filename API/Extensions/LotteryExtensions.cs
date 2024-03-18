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
            // Sort the primary and secondary numbers
            PrimaryNumbers = [.. lottery.PrimaryNumber.OrderBy(n => n)],
            SecondaryNumbers = [.. lottery.SecondaryNumber.OrderBy(n => n)]
        };
    }
}
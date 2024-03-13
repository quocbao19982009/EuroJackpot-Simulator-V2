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
            PrimaryNumber = lottery.PrimaryNumber,
            SecondaryNumber = lottery.SecondaryNumber
        };
    }
}
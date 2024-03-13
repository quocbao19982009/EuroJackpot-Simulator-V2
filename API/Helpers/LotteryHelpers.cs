using API.Entities;

namespace API;

public class LotteryHelpers
{
    public static int[] CreateRandomNumbers(int count, int max)
    {
        var random = new Random();
        return Enumerable.Range(1, count).Select(i => random.Next(1, max)).ToArray();
    }

}

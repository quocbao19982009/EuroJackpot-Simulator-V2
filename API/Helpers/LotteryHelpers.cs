using API.Entities;

namespace API;

public class LotteryHelpers
{
    public static int[] CreateRandomNumbers(int count, int max)
    {
        var random = new Random();
        var numbers = Enumerable.Range(1, max).ToList();

        // Fisher-Yates shuffle
        for (int i = numbers.Count - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            var temp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = temp;
        }

        return numbers.Take(count).ToArray();
    }

    public static int CalculateWinningLottery(Lottery playedLottery, Lottery winningLottery)
    {
        var numberSelectedByUser = playedLottery.PrimaryNumber;
        var starNumberSelectedByUser = playedLottery.SecondaryNumber;
        var numberSelectedResult = winningLottery.PrimaryNumber;
        var starNumberSelectedResult = winningLottery.SecondaryNumber;

        var winNumber = CompareLotteryTicket(numberSelectedByUser, numberSelectedResult).Count();
        var winStarNumber = CompareLotteryTicket(starNumberSelectedByUser, starNumberSelectedResult).Count();

        var winCondition = new Tuple<int, int>(winNumber, winStarNumber);

        return WinConditions.ContainsKey(winCondition) ? WinConditions[winCondition] : 0;
    }
    private static IEnumerable<int> CompareLotteryTicket(IEnumerable<int> arr1, IEnumerable<int> arr2)
    {
        return arr1.Intersect(arr2);
    }


    /// <summary>
    /// Dictionary containing the win conditions for the EuroJackpot lottery.
    /// The key is a tuple representing the number of correctly guessed main numbers and additional numbers.
    /// The value is the corresponding prize amount.
    /// </summary>
    private static readonly Dictionary<Tuple<int, int>, int> WinConditions = new Dictionary<Tuple<int, int>, int>()
        {
        { new Tuple<int, int>(2, 1), 8},
        { new Tuple<int, int>(1, 2), 10},
        { new Tuple<int, int>(3, 0), 15},
        { new Tuple<int, int>(3, 1), 17},
        { new Tuple<int, int>(2, 2), 21},
        { new Tuple<int, int>(4, 0), 103},
        { new Tuple<int, int>(3, 2), 56},
        { new Tuple<int, int>(4, 1), 230},
        { new Tuple<int, int>(4, 2), 4072},
        { new Tuple<int, int>(5, 0), 96134},
        { new Tuple<int, int>(5, 1), 470639},
        { new Tuple<int, int>(5, 2), 34573468}
        };
}

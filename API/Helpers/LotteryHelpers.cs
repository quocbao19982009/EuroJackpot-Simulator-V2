using API.Config;
using API.Entities;
using Exceptions.Game;

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

    public static int CalculateWinningLottery(GameType gameType, Lottery playedLottery, Lottery winningLottery)
    {

        Dictionary<Tuple<int, int>, int> winConditions = gameType switch
        {
            GameType.Eurojackpot => EurojackpotWinConditions,
            GameType.Lotto => LottoWinConditions,
            _ => throw new InvalidGameTypeException()
        };

        var numberSelectedByUser = playedLottery.PrimaryNumber;
        var starNumberSelectedByUser = playedLottery.SecondaryNumber;
        var numberSelectedResult = winningLottery.PrimaryNumber;
        var starNumberSelectedResult = winningLottery.SecondaryNumber;

        var winNumber = CompareLotteryTicket(numberSelectedByUser, numberSelectedResult).Count();
        var winStarNumber = CompareLotteryTicket(starNumberSelectedByUser, starNumberSelectedResult).Count();

        var winCondition = new Tuple<int, int>(winNumber, winStarNumber);

        return winConditions.ContainsKey(winCondition) ? winConditions[winCondition] : 0;
    }

    public static void ValidateLotteryInput(LotteryInput playedLottery, GameSettings gameSettings)
    {

        if (playedLottery.PrimaryNumber.Length != gameSettings.PrimaryNumberCount || playedLottery.SecondaryNumber.Length != gameSettings.SecondaryNumberCount)
        {
            throw new InvalidTicketException();
        }

        if (playedLottery.PrimaryNumber.Any(n => n < 1 || n > gameSettings.PrimaryNumberRange) || playedLottery.SecondaryNumber.Any(n => n < 1 || n > gameSettings.SecondaryNumberRange))
        {
            throw new InvalidTicketException();
        }

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
    private static readonly Dictionary<Tuple<int, int>, int> EurojackpotWinConditions = new Dictionary<Tuple<int, int>, int>()
        {
        { new Tuple<int, int>(2, 1), 8},
        { new Tuple<int, int>(1, 2), 10},
        { new Tuple<int, int>(3, 0), 15},
        { new Tuple<int, int>(3, 1), 19},
        { new Tuple<int, int>(2, 2), 22},
        { new Tuple<int, int>(4, 0), 110},
        { new Tuple<int, int>(3, 2), 100},
        { new Tuple<int, int>(4, 1), 271},
        { new Tuple<int, int>(4, 2), 5049},
        { new Tuple<int, int>(5, 0), 149959},
        { new Tuple<int, int>(5, 1), 914260},
        { new Tuple<int, int>(5, 2), 35000000}
        };

    private static readonly Dictionary<Tuple<int, int>, int> LottoWinConditions = new Dictionary<Tuple<int, int>, int>()
        {
        { new Tuple<int, int>(3, 0), 2},
        { new Tuple<int, int>(4, 0), 10},
        { new Tuple<int, int>(5, 0), 54},
        { new Tuple<int, int>(6, 0), 2460},
        { new Tuple<int, int>(7, 0), 4700000},
        };
}

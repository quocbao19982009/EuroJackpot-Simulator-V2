namespace API.Entities;

public class Lottery : LotteryInput
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;

    public int? GameId { get; set; } // Foreign key property
    public Game? Game { get; set; }// Navigation property
    public Lottery() { }
    public Lottery(int primaryNumberRange, int secondaryNumberRange, int primaryNumberCount, int secondaryNumberCount)
    {
        PrimaryNumber = LotteryHelpers.CreateRandomNumbers(primaryNumberCount, primaryNumberRange);
        SecondaryNumber = LotteryHelpers.CreateRandomNumbers(secondaryNumberCount, secondaryNumberRange);
    }

    public Lottery(LotteryInput lotteryInput)
    {
        PrimaryNumber = lotteryInput.PrimaryNumber;
        SecondaryNumber = lotteryInput.SecondaryNumber;
    }
}

public class LotteryInput
{
    public int[] PrimaryNumber { get; set; } = [];
    public int[] SecondaryNumber { get; set; } = [];

}
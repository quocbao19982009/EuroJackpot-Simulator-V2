namespace API.Entities;

public class Lottery : LotteryInput
{
    public int Id { get; set; }
    public DateTime Date { get; set; }

    public int? GameId { get; set; } // Foreign key property
    public Game? Game { get; set; }// Navigation property

    public Lottery()
    {
        Date = DateTime.Now;
        PrimaryNumber = LotteryHelpers.CreateRandomNumbers(5, 50);
        SecondaryNumber = LotteryHelpers.CreateRandomNumbers(2, 10);
    }
    public Lottery(LotteryInput lotteryInput)
    {
        Date = DateTime.Now;
        PrimaryNumber = lotteryInput.PrimaryNumber;
        SecondaryNumber = lotteryInput.SecondaryNumber;
    }
}

public class LotteryInput
{
    public int[] PrimaryNumber { get; set; } = [];
    public int[] SecondaryNumber { get; set; } = [];

}
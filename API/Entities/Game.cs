namespace API.Entities;

public class Game
{
    public int Id { get; set; }
    public DateTime Date { get; set; } = DateTime.Now;
    // Result LotteryID
    public int? ResultLotteryId { get; set; }
    public Lottery? ResultLottery { get; set; }
    // Lotteries Played
    public List<Lottery> LotteriesPlayed { get; set; } = [];
    public int TotalWinning { get; set; }
    public int TotalCost { get; set; }
}

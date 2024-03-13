namespace API.DTOs
{
    public class GameDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public LotteryDto ResultLottery { get; set; } = new LotteryDto();
        public ICollection<LotteryDto> LotteriesPlayed { get; set; } = [];
    }
}
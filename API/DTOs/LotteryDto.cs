namespace API.DTOs
{
    public class LotteryDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int[] PrimaryNumber { get; set; } = [];
        public int[] SecondaryNumber { get; set; } = [];
    }
}
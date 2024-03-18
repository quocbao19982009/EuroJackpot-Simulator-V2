namespace API.DTOs
{
    public class LotteryDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public List<int> PrimaryNumbers { get; set; } = [];
        public List<int> SecondaryNumbers { get; set; } = [];
    }
}
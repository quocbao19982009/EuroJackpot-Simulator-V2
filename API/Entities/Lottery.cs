namespace API.Entities;

public class Lottery
{
    public int Id { get; set; }
    public int[] PrimaryNumber { get; set; } = [];
    public int[] SecondaryNumber { get; set; } = [];
    public DateTime Date { get; set; } = DateTime.Now;

}
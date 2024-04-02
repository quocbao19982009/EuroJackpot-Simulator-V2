namespace API.Entities;

public class BalanceTransaction
{
    public int Id { get; set; }
    public DateTime Created { get; set; } = DateTime.Now;
    public decimal Amount { get; set; }
    public int UserId { get; set; }
    public AppUser User { get; set; }
}
namespace API.DTOs;

public class TransactionDto
{
    public int Id { get; set; }
    public DateTime Created { get; set; }
    public decimal Amount { get; set; }
}
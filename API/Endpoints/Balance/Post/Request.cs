namespace API.Endpoints.Balance.Post;

public class Request
{
    // Validation, this has to be more than 0
    public decimal Amount { get; set; }
}
namespace API.DTOs;

public class UserDto
{
    public DateTime? Created { get; set; }
    public string Email { get; set; } = string.Empty;
    public string? Token { get; set; }
    public decimal Balance { get; set; }
    public int TotalGames { get; set; }
    public decimal TotalWinnings { get; set; }
    public decimal TotalTopUps { get; set; }
}
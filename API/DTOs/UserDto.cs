using API.Entities;

namespace API.DTOs;

public class UserDto
{
    public DateTime? Created { get; set; }
    public string Email { get; set; } = "";
    public GameDto[] Games { get; set; } = [];
    public string? Token { get; set; }
    public int Balance { get; set; }
}
namespace API.Endpoints.Users.PostRegister;

public class Request
{
    public string Name { get; set; } = "";
    public string Password { get; set; } = "";
    public string Email { get; set; } = "";
}
using API.DTOs;

namespace API.Endpoints.Games.PostGame;
public class Response
{
    public GameDto GameResult { get; set; } = new GameDto();
    public UserDto? User { get; set; } = new UserDto();
}
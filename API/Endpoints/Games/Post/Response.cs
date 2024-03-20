using API.DTOs;

namespace API.Endpoints.Games.Post;
public class Response
{
    public GameDto GameResult { get; set; } = new GameDto();
}
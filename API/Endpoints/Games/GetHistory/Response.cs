using API.DTOs;

namespace API.Endpoints.Games.GetHistory;
public class Response
{
    public List<GameDto> Games { get; set; } = [];
}
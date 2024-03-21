using API.Entities;

namespace API.Endpoints.Games.PostGame;

public class Request
{
    public IEnumerable<LotteryInput> Tickets { get; set; } = [];
}
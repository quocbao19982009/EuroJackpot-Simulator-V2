using API.Entities;

namespace API.Endpoints.Games.Post;

public class Request
{
    public IEnumerable<LotteryInput> Tickets { get; set; } = [];
}
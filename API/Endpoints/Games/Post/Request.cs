using API.Entities;

namespace API.Endpoints.Games.Post;

public class Request
{
    public IEnumerable<LotteryInput> tickets { get; set; } = [];
}
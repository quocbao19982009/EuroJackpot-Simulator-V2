using API.Entities;

namespace API.Endpoints.Eurojackpot.Post;

public class Request
{
    public IEnumerable<LotteryInput> Tickets { get; set; } = [];
}
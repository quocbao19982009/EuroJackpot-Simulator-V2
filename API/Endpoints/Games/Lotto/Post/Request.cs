using API.Entities;

namespace API.Endpoints.Lotto.Post;

public class Request
{
    public IEnumerable<LotteryInput> Tickets { get; set; } = [];
}
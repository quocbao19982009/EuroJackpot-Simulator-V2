using API.Entities;

namespace API.Endpoints.Games.Post;
public class Response
{
    public IEnumerable<Lottery> Lotteries { get; set; } = [];
}
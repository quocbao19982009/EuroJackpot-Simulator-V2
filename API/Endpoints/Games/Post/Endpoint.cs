using FastEndpoints;
using API.Endpoints.Games.Post;
using API.Entities;
using API.Interfaces;

public class Endpoint : Endpoint<Request, Response>
{
    private readonly ILotteriesRepository _lotteriesRepository;

    public override void Configure()
    {
        Post("/api/games");
        AllowAnonymous();
    }

    public Endpoint(ILotteriesRepository lotteriesRepository)
    {
        _lotteriesRepository = lotteriesRepository;
    }
    public override async Task HandleAsync(Request req, CancellationToken ct)
    {
        var lottery = req;
        _lotteriesRepository.AddLottery(lottery);
        var result = await _lotteriesRepository.SaveAllAsync();
        if (!result)
        {
            throw new Exception("Failed to save lottery");
        }
        else
        {
            var lotteries = await _lotteriesRepository.GetLotteriesAsync();
            Response.Lotteries = lotteries;
        }



    }

}

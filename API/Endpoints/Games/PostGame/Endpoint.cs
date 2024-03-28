using FastEndpoints;
using API.Interfaces;
using API.Extensions;

namespace API.Endpoints.Games.PostGame
{
    public class Endpoint : Endpoint<Request, Response>
    {
        private readonly IGameService _gameService;

        public override void Configure()
        {
            Post("/api/games/");
            Description(b => b
            .Accepts<Request>("application/json"));
            Summary(s =>
            {
                s.Summary = "Post a new lottery into database";
                s.Description = "This api is for user to sent their lottery ticket array to the server and the server will response with the server winning ticket";
            });
        }

        public Endpoint(IGameService gameService)
        {
            _gameService = gameService;
        }

        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            try
            {
                var userId = User.GetUserId();
                var gameDto = await _gameService.CreateGameAsync(req.Tickets, userId);

                var response = new Response
                {
                    GameResult = gameDto
                };

                await SendOkAsync(response);
            }
            catch (Exception ex)
            {
                AddError(ex.Message);
                await SendErrorsAsync(400);
            }
        }
    }
}
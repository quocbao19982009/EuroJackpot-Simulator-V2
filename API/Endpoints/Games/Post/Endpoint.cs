using FastEndpoints;
using API.Interfaces;

namespace API.Endpoints.Games.Post
{
    public class Endpoint : Endpoint<Request, Response>
    {
        private readonly IGameService _gameService;

        public override void Configure()
        {
            Post("/api/games");
            Description(b => b
            .Accepts<Request>("application/json"));
            Summary(s =>
            {
                s.Summary = "Post a new lottery into database";
                s.Description = "TODO: This api is for user to sent their lottery ticket array to the server and the server will response with the server winning ticket";
            });

            AllowAnonymous();
        }

        public Endpoint(IGameService gameService)
        {
            _gameService = gameService;
        }

        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            var gameDto = await _gameService.CreateGameAsync(req.Tickets);

            if (gameDto == null)
            {
                throw new Exception("Failed to save the game");
            }

            var response = new Response
            {
                GameResult = gameDto
            };

            await SendOkAsync(response);

        }
    }
}
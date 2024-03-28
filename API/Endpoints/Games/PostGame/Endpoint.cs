using FastEndpoints;
using API.Interfaces;
using API.Extensions;
using Microsoft.AspNetCore.Identity;
using API.Entities;

namespace API.Endpoints.Games.PostGame
{
    public class Endpoint : Endpoint<Request, Response>
    {
        private readonly IGameService _gameService;
        private readonly UserManager<AppUser> _userManager;

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

        public Endpoint(IGameService gameService, UserManager<AppUser> userManager)
        {
            _gameService = gameService;
            _userManager = userManager;
        }


        public override async Task HandleAsync(Request req, CancellationToken ct)
        {
            try
            {
                var userId = User.GetUserId();
                var user = await _userManager.FindByIdAsync(userId.ToString());
                var gameDto = await _gameService.CreateGameAsync(req.Tickets, userId);

                var response = new Response
                {
                    GameResult = gameDto,
                    User = user?.ToUserDto()
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
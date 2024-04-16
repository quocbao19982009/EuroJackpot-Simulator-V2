using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;

namespace API.Endpoints.Balance.Post;
public class Endpoint : Endpoint<Request>
{

    private readonly IUserRepository _userRepository;

    public override void Configure()
    {
        Post("/api/balance");
        Summary(s =>
        {
            s.Summary = "Add balance to user account";
            s.Description = "This api is for user to add balance to their account";
        });
    }

    public Endpoint(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public override async Task HandleAsync(Request req, CancellationToken ct)
    {

        var userId = User.GetUserId();
        var user = await _userRepository.GetUserByIdAsync(userId);

        user.Balance += req.Amount;
        var result = await _userRepository.UpdateUserAsync(user);

        if (!result)
        {
            AddError("Failed to save the transaction");
            await SendErrorsAsync(500);
        }

        var userDto = user.ToUserDto();
        await SendOkAsync(userDto);
    }
}
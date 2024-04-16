using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Interfaces;
using FastEndpoints;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Endpoints.Users.GetUsers;

public class Endpoint : EndpointWithoutRequest<List<UserDto>>
{
    private readonly IUserRepository _userRepository;

    public override void Configure()
    {
        Get("/api/users/all");
        Summary(s =>
        {
            s.Description = "This api is for user to get all users";
            s.Summary = "Get all users";
        });
    }

    public Endpoint(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public override async Task HandleAsync(CancellationToken ct)
    {
        var users = await _userRepository.GetUsersAsync();

        var usersDto = users.Select(user => user.ToUserDto()).ToList();

        await SendOkAsync(usersDto);

    }
}
using API.DTOs;
using API.Entities;

namespace API.Extensions;

public static class AppUserExtensions
{
    public static UserDto ToUserDto(this AppUser user) => new UserDto
    {
        Created = user.Created,
        Email = user.Email ?? "",
        Games = user.Games.Select(game => game.ToGameDto()).ToArray(),
        Balance = user.Balance,
    };
}
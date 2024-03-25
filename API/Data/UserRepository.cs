using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly UserManager<AppUser> _userManager;

    public UserRepository(UserManager<AppUser> userManager)
    {
        _userManager = userManager;
    }
    public async Task<AppUser> GetUserByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return user;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        var user = await _userManager.FindByIdAsync(id.ToString());
        return user;
    }

    public Task<List<AppUser>> GetUsersAsync()
    {
        return _userManager.Users.Include(user => user.Games)
        .ThenInclude(game => game.ResultLottery)
        .Include(user => user.Games)
        .ThenInclude(game => game.LotteriesPlayed).ToListAsync();
    }
}
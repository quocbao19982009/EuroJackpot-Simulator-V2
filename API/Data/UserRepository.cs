using API.Entities;
using API.Interfaces;
using Exceptions.Users;
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
    public async Task<AppUser?> GetUserByEmailAsync(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        return user;
    }

    public async Task<AppUser> GetUserByIdAsync(int id)
    {
        var user = await _userManager.Users
        .Include(user => user.BalanceTransactions)
        .Include(user => user.Games)
        .ThenInclude(game => game.ResultLottery)
        .Include(user => user.Games)
        .ThenInclude(game => game.LotteriesPlayed)
        .FirstOrDefaultAsync(user => user.Id == id);

        if (user == null)
        {
            throw new UserNotFoundException();
        }

        return user;
    }

    public Task<List<AppUser>> GetUsersAsync()
    {
        // NOTE: this help reduce the repeated code in multiple places but include all the related entities can cause performance issue
        return _userManager.Users
        .Include(user => user.BalanceTransactions)
        .Include(user => user.Games)
        .ThenInclude(game => game.ResultLottery)
        .Include(user => user.Games)
        .ThenInclude(game => game.LotteriesPlayed).ToListAsync();
    }

    public async Task<bool> UpdateUserAsync(AppUser user)
    {
        var results = await _userManager.UpdateAsync(user);
        return results.Succeeded;
    }
}